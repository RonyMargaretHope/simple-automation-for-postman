Postman Report Parser
This script parses Postman test run results stored in a JSON file and generates a detailed text report. The report includes overall statistics and details for each request, such as URL, execution time, response code, and test results.

Prerequisites
Node.js installed on your machine.
Usage
Clone the Repository:

bash
Copy code
git clone https://github.com/your-username/your-repo.git
cd your-repo
Install Dependencies:

bash
Copy code
npm install
Run the Script:

Replace 'your_postman_results.json' in the script with the actual name of your Postman test run results JSON file.

bash
Copy code
node postman_report_parser.js
Review the Results:

The script will display overall statistics and details for each request in the console.
A text file with the results will be saved in the reports directory.
Customization
You can customize the script by modifying variables such as the JSON file name, the directory to store reports, and the file naming format.

javascript
Copy code
const rawdata = fs.readFileSync('your_postman_results.json'); // Replace with your JSON file name
const dir = 'reports'; // Customize the directory name
javascript
Copy code
const formattedDate = `${date.getMonth() + 1}_${date.getDate()}_${date.getFullYear()}`;
let fileName = `${formattedDate}_report_1.txt`; // Customize the file naming format
The script also includes a function generateReportContent to format the content of the text file. You can modify this function according to your preferences.

Folder Structure
reports: The directory where the text report files are stored.
