'use client';

import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import { useState } from 'react';

const AddProject = () => {

    const [form, setForm] = useState({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        priority: '',
        status: ''
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Project Data:', form);
    };


    return (
        <div>

            <PageBreadcrumb pageTitle={"Add Project"} />

            <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
                <div className="w-full mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                        Add New Project
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Project Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Project Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Enter project name"
                                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 
              bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 focus:outline-none 
              focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                placeholder="Enter project description"
                                rows="4"
                                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 
              bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 focus:outline-none 
              focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Start Date & End Date */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Start Date
                                </label>
                                <input
                                    type="date"
                                    name="startDate"
                                    value={form.startDate}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 
                bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 focus:outline-none 
                focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    End Date
                                </label>
                                <input
                                    type="date"
                                    name="endDate"
                                    value={form.endDate}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 
                bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 focus:outline-none 
                focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        {/* Priority */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Priority
                            </label>
                            <select
                                name="priority"
                                value={form.priority}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 
              bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 focus:outline-none 
              focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select priority</option>
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option>
                            </select>
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Status
                            </label>
                            <select
                                name="status"
                                value={form.status}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 
              bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 focus:outline-none 
              focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select status</option>
                                <option value="planning">Planning</option>
                                <option value="in-progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>


                        {/* Submit */}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md 
              focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Add Project
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddProject;