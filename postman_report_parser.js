const fs = require('fs');
const path = require('path');

// Load the JSON file with the test run results
const rawdata = fs.readFileSync('postman_results.json'); // Replace 'postman_results.json' with the name of your file
const report = JSON.parse(rawdata);

// Check if the test run results are defined
if (report && report.results) {
    // Process overall statistics
    console.log('Overall Statistics:');
    console.log('-------------------');
    console.log(`Collection Name: ${report.name}`);
    console.log(`Timestamp: ${report.timestamp}`);
    console.log(`Total Successful Requests: ${report.totalPass}`);
    console.log(`Total Failed Requests: ${report.totalFail}`);
    console.log(`Total Execution Time: ${report.totalTime} ms`);
    console.log(`Status: ${report.status}`);
    console.log('\n');

    // Process results for each request
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

    // Create a directory if it doesn't exist
    const dir = 'reports';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    // Generate a file name based on the current date
    const date = new Date();
    const formattedDate = `${date.getMonth() + 1}_${date.getDate()}_${date.getFullYear()}`;
    let fileNumber = 1;
    let fileName = `${formattedDate}_report_1.txt`;

    // Check if a file with the same name exists and increment the number
    while (fs.existsSync(path.join(dir, fileName))) {
        fileNumber++;
        fileName = `${formattedDate}_report_${fileNumber}.txt`;
    }

    // Save the results to a text file
    const filePath = path.join(dir, fileName);
    const content = generateReportContent(report);
    fs.writeFileSync(filePath, content);

    console.log(`Results saved in the file: ${filePath}`);
} else {
    console.error('Incorrect data in the JSON file of test run results.');
}

// Function to generate the content for the text file
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
