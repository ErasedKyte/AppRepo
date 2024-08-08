"use client";
import { useState, useEffect } from "react";
import { getSfaForm, updateSfaForm } from "@/src/app/server";

interface SfaEditProps {
    params: {
        projectId: string;
        sfaFormId: string;
    };
    searchParams: {
        siteOwnerContact?: string;
        siteId?: string;
        siteName?: string;
        optionNo?: string;
        siteLocation?: string;
        siteType?: string;
        traZone?: string;
        siteCoordinates?: string;
        address?: string;
        surveyDate?: string; // Assuming surveyDate is a string in ISO format
        siteSelectionApproval?: string;
        remarks?: string;
    };
}

export default function SfaEditPage({ params, searchParams }: SfaEditProps) {
    const [sfaForm, setSfaForm] = useState<any>(null);
    const [submittedData, setSubmittedData] = useState<any>(null); // State to hold submitted form data

    useEffect(() => {
        async function fetchData() {
            const form = await getSfaForm(params.sfaFormId);
            setSfaForm(form);
            setSubmittedData(form); // Initially set submittedData to the fetched form
        }
        fetchData();
    }, [params.sfaFormId]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);

        // Ensure surveyDate is properly formatted
        const surveyDate = formData.get('surveyDate') 
            ? new Date(formData.get('surveyDate')).toISOString()
            : sfaForm?.surveyDate;

        const data = {
            siteName: formData.get('siteName') || sfaForm?.siteName,
            siteOwnerContact: formData.get('siteOwnerContact') || sfaForm?.siteOwnerContact,
            siteId: formData.get('siteId') || sfaForm?.siteId,
            optionNo: formData.get('optionNo') || sfaForm?.optionNo,
            siteLocation: formData.get('siteLocation') || sfaForm?.siteLocation,
            siteType: formData.get('siteType') || sfaForm?.siteType,
            traZone: formData.get('traZone') || sfaForm?.traZone,
            siteCoordinates: formData.get('siteCoordinates') || sfaForm?.siteCoordinates,
            address: formData.get('address') || sfaForm?.address,
            surveyDate: surveyDate,
            remarks: formData.get('remarks') || sfaForm?.remarks,
            siteSelectionApprovals: {
                deleteMany: {}, // Clear existing approvals
                create: (sfaForm?.siteSelectionApprovals || []).map((approval) => ({
                    id: approval.id,
                    team: formData.get(`team_${approval.id}`) || approval.team,
                    responsibility: formData.get(`responsibility_${approval.id}`) || approval.responsibility,
                    acceptance: formData.get(`acceptance_${approval.id}`) === 'on' || approval.acceptance,
                    name: formData.get(`name_${approval.id}`) || approval.name,
                    sign: formData.get(`sign_${approval.id}`) || approval.sign,
                    date: formData.get(`date_${approval.id}`) ? new Date(formData.get(`date_${approval.id}`) as string).toISOString() : approval.date,
                    comments: formData.get(`comments_${approval.id}`) || approval.comments
                }))
            }
        };

        try {
            await updateSfaForm(params.sfaFormId, data);
            setSfaForm(await getSfaForm(params.sfaFormId));
            setSubmittedData(data); // Update the state with the submitted form data
        } catch (error) {
            console.error('Error updating SFA form:', error);
        }
    };

    if (!sfaForm) return <div className="text-center mt-8">Loading...</div>;

    return <SFAForm sfaForm={sfaForm} handleSubmit={handleSubmit} submittedData={submittedData} />;
}

function SFAForm({ sfaForm, handleSubmit, submittedData }) {
    function renderFormData() {
        const {
            siteOwnerContact,
            siteId,
            siteName,
            optionNo,
            siteLocation,
            siteType,
            traZone,
            siteCoordinates,
            address,
            surveyDate,
            remarks,
            siteSelectionApprovals
        } = submittedData || sfaForm; // Display submittedData if available, otherwise sfaForm

        return (
            <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800">Form Data</h3>
                <p><strong>Site Owner Contact:</strong> {siteOwnerContact}</p>
                <p><strong>Site ID:</strong> {siteId}</p>
                <p><strong>Site Name:</strong> {siteName}</p>
                <p><strong>Option No:</strong> {optionNo}</p>
                <p><strong>Site Location:</strong> {siteLocation}</p>
                <p><strong>Site Type:</strong> {siteType}</p>
                <p><strong>TRA Zone:</strong> {traZone}</p>
                <p><strong>Site Coordinates:</strong> {siteCoordinates}</p>
                <p><strong>Address:</strong> {address}</p>
                <p><strong>Survey Date:</strong> {new Date(surveyDate).toLocaleDateString()}</p>
                <p><strong>Remarks:</strong> {remarks}</p>
                <h4 className="text-lg font-semibold mt-4">Site Selection Approvals</h4>
                {siteSelectionApprovals?.map((approval) => (
                    <div key={approval.id} className="mt-4">
                        <p><strong>Team:</strong> {approval.team}</p>
                        <p><strong>Responsibility:</strong> {approval.responsibility}</p>
                        <p><strong>Acceptance:</strong> {approval.acceptance ? 'Yes' : 'No'}</p>
                        <p><strong>Name:</strong> {approval.name}</p>
                        <p><strong>Sign:</strong> {approval.sign}</p>
                        <p><strong>Date:</strong> {new Date(approval.date).toLocaleDateString()}</p>
                        <p><strong>Comments:</strong> {approval.comments}</p>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <form onSubmit={handleSubmit} className="w-full max-w-lg bg-gray-100 p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit SFA Form</h2>
                <div className="space-y-4">
                    {[
                        { label: 'Site Owner Contact', name: 'siteOwnerContact' },
                        { label: 'Site ID', name: 'siteId' },
                        { label: 'Site Name', name: 'siteName' },
                        { label: 'Option No', name: 'optionNo' },
                        { label: 'Site Location', name: 'siteLocation' },
                        { label: 'Site Type', name: 'siteType' },
                        { label: 'TRA Zone', name: 'traZone' },
                        { label: 'Site Coordinates', name: 'siteCoordinates' },
                        { label: 'Address', name: 'address' },
                        { label: 'Remarks', name: 'remarks' }
                    ].map(({ label, name }) => (
                        <div key={name}>
                            <label className="block text-gray-700 font-medium mb-1">{label}</label>
                            <input
                                name={name}
                                defaultValue={sfaForm?.[name]}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                    ))}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Survey Date</label>
                        <input
                            name="surveyDate"
                            defaultValue={sfaForm?.surveyDate?.toISOString().split('T')[0]}
                            type="date"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <h3 className="text-xl font-bold mt-6 mb-4">Site Selection Approvals</h3>
                    {sfaForm?.siteSelectionApprovals.map((approval) => (
                        <div key={approval.id} className="border-t border-gray-300 pt-4 mt-4">
                            <label className="block text-gray-700 font-medium mb-1">Team</label>
                            <input
                                name={`team_${approval.id}`}
                                defaultValue={approval.team}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />
                            <label className="block text-gray-700 font-medium mt-4 mb-1">Responsibility</label>
                            <input
                                name={`responsibility_${approval.id}`}
                                defaultValue={approval.responsibility}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />
                            <label className="block text-gray-700 font-medium mt-4 mb-1">Acceptance</label>
                            <input
                                name={`acceptance_${approval.id}`}
                                type="checkbox"
                                defaultChecked={approval.acceptance}
                                className="mr-2"
                            />
                            <label className="block text-gray-700 font-medium mt-4 mb-1">Name</label>
                            <input
                                name={`name_${approval.id}`}
                                defaultValue={approval.name}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />
                            <label className="block text-gray-700 font-medium mt-4 mb-1">Sign</label>
                            <input
                                name={`sign_${approval.id}`}
                                defaultValue={approval.sign}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />
                            <label className="block text-gray-700 font-medium mt-4 mb-1">Date</label>
                            <input
                                name={`date_${approval.id}`}
                                defaultValue={new Date(approval.date).toISOString().split('T')[0]}
                                type="date"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />
                            <label className="block text-gray-700 font-medium mt-4 mb-1">Comments</label>
                            <input
                                name={`comments_${approval.id}`}
                                defaultValue={approval.comments}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                    ))}
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                    >
                        Submit
                    </button>
                </div>
            </form>
            {renderFormData()}
        </div>
    );
}
