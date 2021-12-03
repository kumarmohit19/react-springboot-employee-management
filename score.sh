npm install
npm test
cd Backend
mvn clean test
cd ..
npx junit-merge 'test-report.xml' 'Backend/target/surefire-reports/TEST-com.tcs.employeeManagement.EmployeeManagementApplicationTests.xml'