"use client";

import { useState } from 'react';
import { db } from '../../../db'; // Adjust the path to your db

interface SFAFormProps {
  projectId: number;
}

const SFAForm = ({ projectId }: SFAFormProps) => {
  const [formData, setFormData] = useState({
    siteOwnerContact: '',
    siteId: '',
    siteName: '',
    optionNo: '',
    siteLocation: '',
    siteType: '',
    traZone: '',
    siteCoordinates: '',
    address: '',
    surveyDate: '',
    rnpSiteLocation: false,
    rnpHeight: false,
    pb3InitialApproval: false,
    pb3ProvideDocuments: false,
    pb3FullAuthority: false,
    pb3LeaseAmount: false,
    ranSiteImplementation: false,
    ranHeight: false,
    ranMwFeasibility: false,
    ranPowerConnection: false,
    ranPowerSource: false,
    ranPowerCapacity: false,
    ranPowerRoute: false,
    ranAccess: false
