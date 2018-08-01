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
        leadershipCategory: [ { kind: String, title: String, position: String, from: String, to: String, fileUpload: String, isApproved: { type: Boolean, default: null } } ],
        clubCategory: [ { kind: String, title: String, position: String, from: String, to: String, fileUpload: String, isApproved: { type: Boolean, default: null } } ],
        devCategory:[ { kind: String, title: String, position: String, from: String, to: String, fileUpload: String, isApproved: { type: Boolean, default: null } } ],
        wellnessCategory: [ { kind: String, title: String, position: String, from: String, to: String, fileUpload: String, isApproved: { type: Boolean, default: null } } ],
        campusCategory: [ { kind: String, title: String, position: String, from: String, to: String, fileUpload: String, isApproved: { type: Boolean, default: null } } ],
        communityCategory: [ { kind: String, title: String, position: String, from: String, to: String, fileUpload: String, isApproved: { type: Boolean, default: null } } ],
        globalCategory: [ { kind: String, title: String, position: String, from: String, to: String, fileUpload: String, isApproved: { type: Boolean, default: null } } ],
        academicCategory: [ { kind: String, title: String, position: String, from: String, to: String, fileUpload: String, isApproved: { type: Boolean, default: null } } ],
        officialCategory: [ { kind: String, title: String, position: String, from: String, to: String, fileUpload: String, isApproved: { type: Boolean, default: null } } ],
        peerCategory: [ { kind: String, title: String, from: String, to: String, fileUpload: String, isApproved: { type: Boolean, default: null } } ],
        athleticsCategory: [ { kind: String, title: String, position: String, from: String, to: String, fileUpload: String, isApproved: { type: Boolean, default: null } } ],
        creativeCategory: [ { kind: String, title: String, position: String, from: String, to: String, fileUpload: String, isApproved: { type: Boolean, default: null } } ],
        awardCategory: [ { kind: String, title: String, from: String, to: String, fileUpload: String, isApproved: { type: Boolean, default: null } } ],
        otherCategory: [ { kind: String, title: String, position: String, from: String, to: String, fileUpload: String, isApproved: { type: Boolean, default: null } } ],
        //uploads: []
    }
);

const FormModel = exports.FormModel = mongoose.model('FormModel', formSchema);