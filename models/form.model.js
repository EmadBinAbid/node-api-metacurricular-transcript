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
        //school: { type: String, required: true },
        major: { type: String, required: true },
        leadershipCategory: [ { title: String, position: String, from: String, to: String, fileUpload: String, isApproved: { type: Boolean, default: null } } ],
        clubCategory: [ { title: String, position: String, from: String, to: String, fileUpload: String, isApproved: { type: Boolean, default: null } } ],
        devCategory:[ { title: String, position: String, from: String, to: String, fileUpload: String, isApproved: { type: Boolean, default: null } } ],
        wellnessCategory: [ { title: String, position: String, from: String, to: String, fileUpload: String, isApproved: { type: Boolean, default: null } } ],
        campusCategory: [ { title: String, position: String, from: String, to: String, fileUpload: String, isApproved: { type: Boolean, default: null } } ],
        communityCategory: [ { title: String, position: String, from: String, to: String, fileUpload: String, isApproved: { type: Boolean, default: null } } ],
        globalCategory: [ { title: String, position: String, from: String, to: String, fileUpload: String, isApproved: { type: Boolean, default: null } } ],
        academicCategory: [ { title: String, position: String, from: String, to: String, fileUpload: String, isApproved: { type: Boolean, default: null } } ],
        officialCategory: [ { title: String, position: String, from: String, to: String, fileUpload: String, isApproved: { type: Boolean, default: null } } ],
        peerCategory: [ { title: String, from: String, to: String, fileUpload: String, isApproved: { type: Boolean, default: null } } ],
        athleticsCategory: [ { title: String, position: String, from: String, to: String, fileUpload: String, isApproved: { type: Boolean, default: null } } ],
        creativeCategory: [ { title: String, position: String, from: String, to: String, fileUpload: String, isApproved: { type: Boolean, default: null } } ],
        awardCategory: [ { title: String, from: String, to: String, fileUpload: String, isApproved: { type: Boolean, default: null } } ],
        otherCategory: [ { title: String, position: String, from: String, to: String, fileUpload: String, isApproved: { type: Boolean, default: null } } ],
        //uploads: []
    }
);

const FormModel = exports.FormModel = mongoose.model('FormModel', formSchema);