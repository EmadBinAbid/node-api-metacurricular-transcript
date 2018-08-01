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
        studentID: { type: String, required: true },
        school: { type: String, required: true },
        major: { type: String, required: true },
        leadershipCategory: [ { type: String, title: String, position: String, from: String, to: String, fileUpload: String, isApproved: { type: Boolean, default: null } } ],
        clubCategory: [ { type: String, title: String, position: String, from: String, to: String, fileUpload: String, isApproved: { type: Boolean, default: null } } ],
        devCategory:[ { type: String, title: String, position: String, from: String, to: String, fileUpload: String, isApproved: { type: Boolean, default: null } } ],
        wellnessCategory: [ { type: String, title: String, position: String, from: String, to: String, fileUpload: String, isApproved: { type: Boolean, default: null } } ],
        campusCategory: [ { type: String, title: String, position: String, from: String, to: String, fileUpload: String, isApproved: { type: Boolean, default: null } } ],
        communityCategory: [ { type: String, title: String, position: String, from: String, to: String, fileUpload: String, isApproved: { type: Boolean, default: null } } ],
        globalCategory: [ { type: String, title: String, position: String, from: String, to: String, fileUpload: String, isApproved: { type: Boolean, default: null } } ],
        academicCategory: [ { type: String, title: String, position: String, from: String, to: String, fileUpload: String, isApproved: { type: Boolean, default: null } } ],
        officialCategory: [ { type: String, title: String, position: String, from: String, to: String, fileUpload: String, isApproved: { type: Boolean, default: null } } ],
        peerCategory: [ { type: String, title: String, from: String, to: String, fileUpload: String, isApproved: { type: Boolean, default: null } } ],
        athleticsCategory: [ { type: String, title: String, position: String, from: String, to: String, fileUpload: String, isApproved: { type: Boolean, default: null } } ],
        creativeCategory: [ { type: String, title: String, position: String, from: String, to: String, fileUpload: String, isApproved: { type: Boolean, default: null } } ],
        awardCategory: [ { type: String, title: String, from: String, to: String, fileUpload: String, isApproved: { type: Boolean, default: null } } ],
        otherCategory: [ { type: String, title: String, position: String, from: String, to: String, fileUpload: String, isApproved: { type: Boolean, default: null } } ],
        //uploads: []
    }
);

const FormModel = exports.FormModel = mongoose.model('FormModel', formSchema);