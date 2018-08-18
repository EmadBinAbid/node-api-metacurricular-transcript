/*
@author: Emad Bin Abid
@date: August 17, 2018
*/

//Dependencies
const fs = require('fs');
const cmd = require('node-cmd');

const formModel = require('./models/form.model');

const FormModel = formModel.FormModel;

//Creating the LaTeX script to generate transcript

const monthsArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const headingTemplate = {
    leadershipCategory: ["StudentLeadership.png", "Student Govt / Club / Project", "Position", "MM / YY"],
    globalCategory: ["GlobalEngagement.png", "Program / Institution", "MM / YY"],
    academicCategory: ["AcademicPresentation.png", "Conference / Presentation", "Role / Position", "MM / YY"],
    officialCategory: ["UniversityOfficialCommittee.png", "Committee", "Role", "MM / YY"],
    devCategory: ["CareerDevelopment.png", "Organization / HU Department", "Position", "MM / YY"],
    peerCategory: ["PeerTutoring.png", "Course", "MM / YY"],
    clubCategory: ["HUClubSocietyOrganization.png", "Club / Society", "Position", "MM / YY"],
    athleticsCategory: ["AthleticsRecreation.png", "Team / Competition", "Achievement", "MM / YY"],
    wellnessCategory: ["StudentWellnessService.png", "Event / Program", "Role / Achievement", "MM / YY"],
    communityCategory: ["CommunityService.png", "Project / Program", "Position", "MM / YY"],
    creativeCategory: ["PublicationsCreativeActivity.png", "Credential", "Role / Achievement", "MM / YY"],
    awardCategory: ["AwardScholarship.png", "Award", "MM / YY"],
    campusCategory: ["CampusInvolvement.png", "Event / Program", "Role", "MM / YY"],
    otherCategory: ["Other.png", "Event / Program", "Role", "MM / YY"]
};

var studentName = "";
var studentID = "";
var issueDate = "";
var program = "";
var major = "";
var school = "";

generateLatex = function(studentFormData)
{
    var texData = "";

    //Defining Header
    texData += "\\documentclass{article}\n";

    //Imporing Libraries
    texData += "\\usepackage[utf8]{inputenc}\n";
    texData += "\\usepackage[margin=0.2in]{geometry}\n";
    texData += "\\usepackage{colortbl}\n";
    texData += "\\usepackage{draftwatermark}\n";
    texData += "\\usepackage{graphicx}\n";
    texData += "\\usepackage{float}\n";
    texData += "\\usepackage{setspace}\n";

    //Setting New Command
    texData += "\\renewcommand{\\rmdefault}{phv}\n\n\n";

    //Setting Watermark
    texData += "\\SetWatermarkText{\\includegraphics{../../assets/watermark}}\n";
    texData += "\\SetWatermarkAngle{0}\n";
    texData += "\\SetWatermarkScale{0.8}\n\n\n";

    //Beginning Document
    texData += "\\begin{document}\n\n\n";
    texData += "\\begin{picture}(0,0)(100,100)\n";
    texData += "\t\\put(85,40){\\includegraphics[scale=0.2]{../../assets/HU-Logo.png}}\n";
    texData += "\\end{picture}\n";
    texData += "\\begin{center}\n";
    texData += "\\includegraphics[scale=0.5]{../../assets/Title}\n";
    texData += "\\includegraphics[scale=0.3]{../../assets/Subtitle}\n";
    texData += "\\end{center}\n";
    texData += "\\arrayrulecolor{white}\n\n";
    texData += "\\scriptsize\n";
    texData += "\\begin{spacing}{1.2}\n\n";
    texData += "\\begin{tabular}{p{2.17cm}p{7.2cm}p{1.5cm}p{7.5cm}}\n\n";
    texData += "\t\\textbf{Student's Number:} &  " + this.studentID + "  & \\textbf{Program } & " + this.program + "	 \\\\ \n\n";
    texData += "\t\t\\textbf{Student's Name:}  &   " + this.studentName + " &  \\textbf{Major:} & " + this.major + " \\\\ \n\n\n";
    texData += "\t\t\\textbf{Issue Date:}  &    " + this.issueDate + "  &  \\textbf{School: } & " + this.school + " \\\\ \n";
    texData += "\\end{tabular}\n";
    texData += "\\\\ \n";
    texData += "\\end{spacing}\n";
    texData += "\\tiny\n";
    texData += "\t\\begin{tabular}{p{9.5cm}p{10cm}}\n";
    texData += "\t\t\\\\ \n";

    var boxNumber = 1;
    var rightBoxEntries = 0;

    for(key in studentFormData)
    {
        if(key.includes('Category', 0))
        {
            if(studentFormData[key].length != 0)
            {
                //Box: ODD -> Main Heading
                texData += "%Category: NEW ODD \n";
                texData += "\t\t\\includegraphics[width=3.55in]{../../assets/" + headingTemplate[key][0] + "}\n\n";
                    
                texData += "\\hspace{-1.4em}\n";

                //Table Configuration
                if(headingTemplate[key].length === 4)
                {
                    texData += "\t\\begin{tabular}{p{4.5cm}p{2cm}p{2cm}}\n";
                    texData += "\\\\ \n\n";

                    //Table Heading
                    texData += "\t\\textbf{" + headingTemplate[key][1] + "} & \\textbf{" + headingTemplate[key][2] + "} & \\textbf{" + headingTemplate[key][3] + "} \\\\ \n";
                    
                    //Table Entries
                    for(var objectNumber=0; objectNumber<studentFormData[key].length; objectNumber++)
                    {
                        if(studentFormData[key][objectNumber].isApproved)
                        {
                            texData += studentFormData[key][objectNumber].title + " & " +
                            studentFormData[key][objectNumber].position + " & " +  
                            monthsArray[studentFormData[key][objectNumber].from.split('-')[2] - 1] + ' ' + studentFormData[key][objectNumber].from.split('-')[0] + 
                            "-" + 
                            monthsArray[studentFormData[key][objectNumber].to.split('-')[2] - 1] + ' ' + studentFormData[key][objectNumber].to.split('-')[0] + 
                            " \\\\ \n";

                            if(boxNumber%2 === 0)
                            {
                                rightBoxEntries += 1;
                            }
                        }
                    }
                }
                else if(headingTemplate[key].length === 3)
                {
                    texData += "\t\\begin{tabular}{p{7cm}p{2cm} }\n";
                    texData += "\\\\ \n\n";

                    //Table Heading
                    texData += "\\textbf{" + headingTemplate[key][1] + "} &  \\textbf{" + headingTemplate[key][2] + "} \\\\ \n\n";

                    //Table Entries
                    for(var objectNumber=0; objectNumber<studentFormData[key].length; objectNumber++)
                    {
                        if(studentFormData[key][objectNumber].isApproved)
                        {
                            texData += studentFormData[key][objectNumber].title + " & " +  
                            monthsArray[studentFormData[key][objectNumber].from.split('-')[2] - 1] + ' ' + studentFormData[key][objectNumber].from.split('-')[0] + 
                            "-" + 
                            monthsArray[studentFormData[key][objectNumber].to.split('-')[2] - 1] + ' ' + studentFormData[key][objectNumber].to.split('-')[0] + 
                            " \\\\ \n";

                            if(boxNumber%2 === 0)
                            {
                                rightBoxEntries += 1;
                            }
                        }
                    }
                }
                
                if(boxNumber%2 !== 0)
                {
                    texData += "\\end{tabular} & %Category: NEW EVEN \n";
                }
                else if(boxNumber%2 === 0)
                {
                    while(rightBoxEntries < 12)
                    {
                        texData += "\\\\ \n";
                        rightBoxEntries += 1;
                    }
                    texData += "\\end{tabular} \\\\ \n";

                }
                boxNumber += 1;
                rightBoxEntries = 0;
            }
        }
    };

    texData += "\\end{tabular} \n";
    texData += "\\scriptsize\n";
    texData += "\\begin{center}\n";
    texData += "\\textbf{End of Transcript}\n";
    texData += "\\end{center}\n\n\n";
    texData += "\\vfill\n";
    texData += "\\vfill\n";
    texData += "\\vfill\n";
    texData += "\\begin{tabular}{p{0.6cm}p{3cm}p{12cm}p{1.5cm}}\n";
    texData += "&\\hrulefill &   & \\hrulefill \\\\ \n";
    texData += "&\n";
    texData += "\\textbf{Dean,Student Affairs}\n";
    texData += "&  &\n";
    texData += "\\textbf{Registrar}\\\\ \n";
    texData += "\\end{tabular}\n\n";
    texData += "\\tiny\n";
    texData += "\\vspace*{\\fill}\n";
    texData += "\\begin{tabular}{p{17.2cm}p{4cm} }\n";
    texData += "\\textit{The University reserves the right to correct any error made inadvertently on this transcript.} & \\textbf{Page 1 of 1}\n";
    texData += "\\end{tabular}\n\n";
    texData += "\\end{document}\n";

    return texData;
}

setStudentName = function(studentName)
{
    this.studentName = studentName;
}

setStudentID = function(studentID)
{
    this.studentID = studentID.substring(2, 7);
}

setIssueDate = function(issueDate)
{
    issueDate = issueDate.split(' ')[0];
    issueDate = issueDate.split('-');
    issueDate = monthsArray[issueDate[1] - 1] + " " + issueDate[2] + ", " + issueDate[0];

    this.issueDate = issueDate;
}

setProgram = function(program)
{
    this.program = program;
}

setMajor = function(major)
{
    this.major = major;
}

setSchool = function(school)
{
    this.school = school;
}

exports.generateTranscript = function(passedstudentID)
{
    FormModel.findOne({ "studentID": passedstudentID }, (err, formObject) =>
    {
        if(err)
            res.send("Error in retrieving student's form data from database.");
        else
        {
            setStudentID(formObject.studentID);
            setStudentName(formObject.firstName + ' ' + formObject.lastName);
            setIssueDate(new Date(Date.now()).toLocaleString());
            setMajor(formObject.major);

            if(formObject.major === "Computer Science" || formObject.major === "Electrical Engineering")
            {
                setProgram("Bachelor of Science");
                setSchool("Dhanani's School of Science and Engineering");
            }

            if(formObject.major === "Communication and Design")
            {
                setProgram("Bachelor of Arts (Honors)");
                setSchool("School of Arts, Humanities and Social Sciences");
            }

            if(formObject.major === "Social Development and Policy")
            {
                setProgram("Bachelor of Science (Honors)");
                setSchool("School of Arts, Humanities and Social Sciences");
            }
            
            var texData = generateLatex(formObject);

            //Deleting the directory if it already exists...
            fs.readdir('./public/transcripts/' + formObject.studentID.substring(2, 7) + '/', (err, files) => {
                if(err)
                {

                }
                else
                {
                    files.forEach((file) => {
                        fs.unlink('./public/transcripts/' + formObject.studentID.substring(2, 7) + '/' + file, (err) => {
                            if(err)
                            {
                                console.log('[-]: Error in removing file \'./public/transcripts/' + formObject.studentID.substring(2, 7) + '/' + file + '\'.');
                            }
                            else
                            {
                                console.log('[+]: Successfully removed file \'./public/transcripts/' + formObject.studentID.substring(2, 7) + '/' + file + '\'.');
                            }
                        });
                    });
                }
            });
            // fs.rmdir('./public/transcripts/' + formObject.studentID.substring(2, 7), (err) => {
            //     if(err)
            //     {
            //         console.log('[-]: Error in removing \'./public/transcripts/' + formObject.studentID.substring(2, 7) + '\'.');
            //     }
            //     else
            //     {
            //         console.log('[+]: Successfully removed directory \'./public/transcripts/' + formObject.studentID.substring(2, 7) + '\'.');
            //     }
            // });

            fs.mkdir('./public/transcripts/' + formObject.studentID.substring(2, 7), (err) => {
                if(err)
                {
                    console.log('[-]: Error in creating new directory \'./public/transcripts/' + formObject.studentID.substring(2, 7) + '\'. The directory may already exist.');
                    fs.writeFile('./public/transcripts/' + formObject.studentID.substring(2, 7) + '/document.tex', texData, function(err)
                    {
                        if(err)
                        {
                            console.log('[-]: Error in writing script to file \'./public/transcripts/' + formObject.studentID.substring(2, 7) + '/document.tex\'.');
                        }
                        else
                        {
                            console.log('[+]: Successfully written script to file \'./public/transcripts/' + formObject.studentID.substring(2, 7) + '/document.tex\'.');
                        }
                    });
                    
                    cmd.run('pdflatex -output-directory ' + './public/transcripts/' + formObject.studentID.substring(2, 7) + ' ' + './public/transcripts/' + formObject.studentID.substring(2, 7) + '/document.tex');
                }
                else
                {
                    console.log('[+]: Successfully created new directory \'./public/transcripts/' + formObject.studentID.substring(2, 7) + '\'.');
                    fs.writeFile('./public/transcripts/' + formObject.studentID.substring(2, 7) + '/document.tex', texData, function(err)
                    {
                        if(err)
                        {
                            console.log('[-]: Error in writing script to file \'./public/transcripts/' + formObject.studentID.substring(2, 7) + '/document.tex\'.');
                        }
                        else
                        {
                            console.log('[+]: Successfully written script to file \'./public/transcripts/' + formObject.studentID.substring(2, 7) + '/document.tex\'.');
                        }
                    });
                    
                    cmd.run('pdflatex -output-directory ' + './public/transcripts/' + formObject.studentID.substring(2, 7) + ' ' + './public/transcripts/' + formObject.studentID.substring(2, 7) + '/document.tex');
                }
            });
        }
    });
}