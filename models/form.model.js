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
        studentLeadership: { organization: Array, role: Array, from: Array, to: Array },
        huClubSocietyOrg:{ organization: Array, role: Array, from: Array, to: Array },
        careerDevelopment:{ organization: Array, role: Array, from: Array, to: Array },
        studentWellnessServices: { organization: Array, role: Array, from: Array, to: Array },
        campusInvolvement: { event: Array, role: Array, from: Array, to: Array },
        communityServices: { project: Array, description: Array, from: Array, to: Array },
        globalEngagement: { program: Array, role: Array, from: Array, to: Array},
        academicPresentation: { conference: Array, role: Array, from: Array, to: Array },
        universityOfficialCommittee: { committee: Array, role: Array, from: Array, to: Array },
        peerTutoring: { course: Array, from: Array, to: Array },
        athletics: { competition: Array, role: Array, from: Array, to: Array },
        creativeActivity: { credentials: Array, role: Array, from: Array, to: Array },
        award: { award: Array, from: Array, to: Array },
        other: { program: Array, role: Array, from: Array, to: Array }
        
    }
);

const FormModel = exports.FormModel = mongoose.model('FormModel', formSchema);