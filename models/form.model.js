/*
@author: Emad Bin Abid
@date: July 12, 2018
*/

//Dependencies
const mongoose = require('mongoose');

//Defining Schema --> TENTATIVE FORM SCHEMA
const formSchema = mongoose.Schema(
    {
        //formId --> auto-generated

        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        studentId: { type: String, required: true },
        school: { type: String, required: true },
        major: { type: String, required: true },
        studentLeadership: [ { organization: String, role: String, from: String, to: String/*, fileupload: String*/ } ],
        huClubSocietyOrg: [ { organization: String, role: String, from: String, to: String/*, fileupload: String*/ } ],
        careerDevelopment:[ { organization: String, role: String, from: String, to: String/*, fileupload: String*/ } ],
        studentWellnessServices: [ { organization: String, role: String, from: String, to: String/*, fileupload: String*/ } ],
        campusInvolvement: [ { event: String, role: String, from: String, to: String/*, fileupload: String*/ } ],
        communityServices: [ { project: String, description: String, from: String, to: String/*, fileupload: String*/ } ],
        globalEngagement: [ { program: String, role: String, from: String, to: String/*, fileupload: String*/ } ],
        academicPresentation: [ { conference: String, role: String, from: String, to: String/*, fileupload: String*/ } ],
        universityOfficialCommittee: [ { committee: String, role: String, from: String, to: String/*, fileupload: String*/ } ],
        peerTutoring: [ { course: String, from: String, to: String/*, fileupload: String*/ } ],
        athletics: [ { competition: String, role: String, from: String, to: String/*, fileupload: String*/ } ],
        creativeActivity: [ { credentials: String, role: String, from: String, to: String/*, fileupload: String*/ } ],
        award: [ { award: String, from: String, to: String/*, fileupload: String*/ } ],
        other: [ { program: String, role: String, from: String, to: String/*, fileupload: String*/ } ],
        uploads: []
        
    }
);

const FormModel = exports.FormModel = mongoose.model('FormModel', formSchema);