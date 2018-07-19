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
        studentLeadership: [ { organization: String, role: String, from: String, to: String, isApproved: { type: Boolean, default: null } } ],
        huClubSocietyOrg: [ { organization: String, role: String, from: String, to: String, isApproved: { type: Boolean, default: null } } ],
        careerDevelopment:[ { organization: String, role: String, from: String, to: String, isApproved: { type: Boolean, default: null } } ],
        studentWellnessServices: [ { organization: String, role: String, from: String, to: String, isApproved: { type: Boolean, default: null } } ],
        campusInvolvement: [ { event: String, role: String, from: String, to: String, isApproved: { type: Boolean, default: null } } ],
        communityServices: [ { project: String, description: String, from: String, to: String, isApproved: { type: Boolean, default: null } } ],
        globalEngagement: [ { program: String, role: String, from: String, to: String, isApproved: { type: Boolean, default: null } } ],
        academicPresentation: [ { conference: String, role: String, from: String, to: String, isApproved: { type: Boolean, default: null } } ],
        universityOfficialCommittee: [ { committee: String, role: String, from: String, to: String, isApproved: { type: Boolean, default: null } } ],
        peerTutoring: [ { course: String, from: String, to: String, isApproved: { type: Boolean, default: null } } ],
        athletics: [ { competition: String, role: String, from: String, to: String, isApproved: { type: Boolean, default: null } } ],
        creativeActivity: [ { credentials: String, role: String, from: String, to: String, isApproved: { type: Boolean, default: null } } ],
        award: [ { award: String, from: String, to: String, isApproved: { type: Boolean, default: null } } ],
        other: [ { program: String, role: String, from: String, to: String, isApproved: { type: Boolean, default: null } } ],
        uploads: []
    }
);

const FormModel = exports.FormModel = mongoose.model('FormModel', formSchema);