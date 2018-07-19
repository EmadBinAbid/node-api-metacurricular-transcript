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
        studentLeadership: [ { organization: String, role: String, from: String, to: String, isApproved: Boolean } ],
        huClubSocietyOrg: [ { organization: String, role: String, from: String, to: String, isApproved: Boolean } ],
        careerDevelopment:[ { organization: String, role: String, from: String, to: String, isApproved: Boolean } ],
        studentWellnessServices: [ { organization: String, role: String, from: String, to: String, isApproved: Boolean } ],
        campusInvolvement: [ { event: String, role: String, from: String, to: String, isApproved: Boolean } ],
        communityServices: [ { project: String, description: String, from: String, to: String, isApproved: Boolean } ],
        globalEngagement: [ { program: String, role: String, from: String, to: String, isApproved: Boolean } ],
        academicPresentation: [ { conference: String, role: String, from: String, to: String, isApproved: Boolean } ],
        universityOfficialCommittee: [ { committee: String, role: String, from: String, to: String, isApproved: Boolean } ],
        peerTutoring: [ { course: String, from: String, to: String, isApproved: Boolean } ],
        athletics: [ { competition: String, role: String, from: String, to: String, isApproved: Boolean } ],
        creativeActivity: [ { credentials: String, role: String, from: String, to: String, isApproved: Boolean } ],
        award: [ { award: String, from: String, to: String, isApproved: Boolean } ],
        other: [ { program: String, role: String, from: String, to: String, isApproved: Boolean } ],
        uploads: []
    }
);

const FormModel = exports.FormModel = mongoose.model('FormModel', formSchema);