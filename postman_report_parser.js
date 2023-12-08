const fs = require('fs');
const path = require('path');

function loadJsonFile(filePath) {
    const rawdata = fs.readFileSync(filePath);
    return JSON.parse(rawdata);
}

function createDirectoryIfNotExists(directory) {
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory);
    }
}

function generateFileName() {
    const date = new Date();
    const formattedDate = `${date.getFullYear()}_${padZero(date.getMonth() + 1)}_${padZero(date.getDate())}`;
    let fileNumber = 1;
    let fileName = `${formattedDate}_report_1.txt`;

    while (fs.existsSync(path.join('reports', fileName))) {
        fileNumber++;
        fileName = `${formattedDate}_report_${fileNumber}.txt`;
    }

    return fileName;
}

function padZero(value) {
    return value.toString().padStart(2, '0');
}

function saveResultsToFile(filePath, content) {
    fs.writeFileSync(filePath, content);
}

function processTestResults(report) {
    if (report && report.results) {
        console.log('Overall Statistics:');
        console.log('-------------------');
        console.log(`Collection Name: ${report.name}`);
        console.log(`Timestamp: ${report.timestamp}`);
        console.log(`Total Successful Requests: ${report.totalPass}`);
        console.log(`Total Failed Requests: ${report.totalFail}`);
        console.log(`Total Execution Time: ${report.totalTime} ms`);
        console.log(`Status: ${report.status}`);
        console.log('\n');

        console.log('Details for Each Request:');
        console.log('-------------------------');
        report.results.forEach((result, index) => {
            console.log(`Request #${index + 1}: ${result.name}`);
            console.log(`   URL: ${result.url}`);
            console.log(`   Execution Time: ${result.time} ms`);
            console.log(`   Response Code: ${result.responseCode}`);
            console.log('   Test Results:');
            Object.keys(result.tests).forEach(testName => {
                console.log(`      ${testName}: ${result.tests[testName]}`);
            });
            console.log('\n');
        });

        const dir = 'reports';
        createDirectoryIfNotExists(dir);

        const fileName = generateFileName();
        const filePath = path.join(dir, fileName);
        const content = generateReportContent(report);
        saveResultsToFile(filePath, content);

        console.log(`Results saved in the file: ${filePath}`);
    } else {
        console.error('Incorrect data in the JSON file of test run results.');
    }
}

function generateReportContent(report) {
    let content = `Overall Statistics:\n`;
    content += `-------------------\n`;
    content += `Collection Name: ${report.name}\n`;
    content += `Timestamp: ${report.timestamp}\n`;
    content += `Total Successful Requests: ${report.totalPass}\n`;
    content += `Total Failed Requests: ${report.totalFail}\n`;
    content += `Total Execution Time: ${report.totalTime} ms\n`;
    content += `Status: ${report.status}\n\n`;

    content += `Details for Each Request:\n`;
    content += `-------------------------\n`;

    report.results.forEach((result, index) => {
        content += `Request #${index + 1}: ${result.name}\n`;
        content += `   URL: ${result.url}\n`;
        content += `   Execution Time: ${result.time} ms\n`;
        content += `   Response Code: ${result.responseCode}\n`;
        content += `   Test Results:\n`;

        Object.keys(result.tests).forEach(testName => {
            content += `      ${testName}: ${result.tests[testName]}\n`;
        });

        content += '\n';
    });

    return content;
}

const inputFileName = 'postman_results.json';
const report = loadJsonFile(inputFileName);
processTestResults(report);
