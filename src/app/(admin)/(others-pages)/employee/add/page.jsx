'use client'

import { useModal } from "../../../../../hooks/useModal";

import Label from "../../../../../components/form/Label";
import Input from "../../../../../components/form/input/InputField";
import Button from "../../../../../components/ui/button/Button";

const addEmplyee = () => {

    const { isOpen, openModal, closeModal } = useModal();

    return (
        <div>
            <div className="no-scrollbar relative w-full w-full rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                <div className="px-2 pr-14">
                    <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                        Add Emplyee
                    </h4>
                    <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                        Add Emplyee in the System
                    </p>
                </div>
                <form className="flex flex-col">
                    <div className="custom-scrollbar h-fit px-2 pb-3">

                        <div className="mt-7">
                            <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                                Personal Information
                            </h5>

                            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                                <div className="col-span-2 lg:col-span-1">
                                    <Label>First Name</Label>
                                    <Input type="text" defaultValue="Md Emon" />
                                </div>

                                <div className="col-span-2 lg:col-span-1">
                                    <Label>Last Name</Label>
                                    <Input type="text" defaultValue="Hossen" />
                                </div>

                                <div className="col-span-2 lg:col-span-1">
                                    <Label>Email Address</Label>
                                    <Input type="text" defaultValue="mdemong87@gmail.com" />
                                </div>

                                <div className="col-span-2 lg:col-span-1">
                                    <Label>Phone</Label>
                                    <Input type="text" defaultValue="+09 363 398 46" />
                                </div>

                                <div className="col-span-2">
                                    <Label>Bio</Label>
                                    <Input type="text" defaultValue="Full Stack Developer" />
                                </div>
                            </div>
                        </div>

                        <div className="mt-7">
                            <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                                Personal Information
                            </h5>

                            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                                <div className="col-span-2 lg:col-span-1">
                                    <Label>First Name</Label>
                                    <Input type="text" defaultValue="Md Emon" />
                                </div>

                                <div className="col-span-2 lg:col-span-1">
                                    <Label>Last Name</Label>
                                    <Input type="text" defaultValue="Hossen" />
                                </div>

                                <div className="col-span-2 lg:col-span-1">
                                    <Label>Email Address</Label>
                                    <Input type="text" defaultValue="mdemong87@gmail.com" />
                                </div>

                                <div className="col-span-2 lg:col-span-1">
                                    <Label>Phone</Label>
                                    <Input type="text" defaultValue="+09 363 398 46" />
                                </div>

                                <div className="col-span-2">
                                    <Label>Bio</Label>
                                    <Input type="text" defaultValue="Full Stack Developer" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                                Social Links
                            </h5>

                            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                                <div>
                                    <Label>Facebook</Label>
                                    <Input
                                        type="text"
                                        defaultValue="https://emonhossen.vercel.app/"
                                    />
                                </div>

                                <div>
                                    <Label>X.com</Label>
                                    <Input type="text" defaultValue="https://emonhossen.vercel.app/" />
                                </div>

                                <div>
                                    <Label>Linkedin</Label>
                                    <Input
                                        type="text"
                                        defaultValue="https://emonhossen.vercel.app/"
                                    />
                                </div>

                                <div>
                                    <Label>Instagram</Label>
                                    <Input
                                        type="text"
                                        defaultValue="https://emonhossen.vercel.app/"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                        <Button size="sm">
                            Save
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default addEmplyee;