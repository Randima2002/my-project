import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { DateRangePicker } from "@nextui-org/react";

export default function popupmodel({ action }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        nic: '',
        contact: '',
        stayDuration: null,
        adult: '',
        children: '',
        roomType: ''
    });

    const handleChange = (value, name) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleRoomTypeChange = (event) => {
        const { value } = event.target;
        // console.log("Room type selected:", value);
        setFormData({ ...formData, roomType: value });
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log(`${formData.stayDuration.start}, ${formData.stayDuration.end}`);
        // console.log('Room Type: ', formData);
        console.log('Name : ', formData.name.target.value);
    };

    return (
        <>
            <Button onPress={onOpen} className="bg-black text-white font-bold -mt-1">Add New</Button>
            <Modal
                backdrop="opaque"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                radius="lg"
                size="3xl"
                placement="top"
                classNames={{
                    body: "py-6",
                    backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
                    base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
                    header: "border-b-[1px] border-[#292f46]",
                    footer: "border-t-[1px] border-[#292f46]",
                    closeButton: "hover:bg-white/5 active:bg-white/10",
                }}
                style={{ display: action ? 'flex' : 'none' }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Add New Booking</ModalHeader>
                            <ModalBody>
                                <form onSubmit={handleSubmit}>
                                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                        <Input
                                            type="text"
                                            className="border-0 focus:border-0"
                                            name="name"
                                            placeholder="Enter name"
                                            onChange={(value) => handleChange(value, 'name')}
                                        />
                                    </div>
                                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                        <Input
                                            type="email"
                                            className="border-0 focus:border-0"
                                            name="email"
                                            placeholder="Enter email"
                                            onChange={(value) => handleChange(value, 'email')}
                                        />
                                    </div>
                                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                        <Input
                                            type="number"
                                            className="border-0 focus:border-0"
                                            name="nic"
                                            placeholder="Enter NIC"
                                            onChange={(value) => handleChange(value, 'nic')}
                                        />
                                    </div>
                                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                        <Input
                                            type="number"
                                            className="border-0 focus:border-0"
                                            name="contact"
                                            placeholder="Enter contact number"
                                            onChange={(value) => handleChange(value, 'contact')}
                                        />
                                    </div>
                                    <div>
                                        <DateRangePicker
                                            label="Stay duration"
                                            className="max-w-xs"
                                            onChange={(value) => handleChange(value, 'stayDuration')}
                                        />
                                    </div>
                                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                        <Input
                                            type="number"
                                            className="border-0 focus:border-0"
                                            name="adult"
                                            placeholder="Enter number of adults"
                                            onChange={(value) => handleChange(value, 'adult')}
                                        />
                                    </div>
                                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                        <Input
                                            type="number"
                                            className="border-0 focus:border-0"
                                            name="children"
                                            placeholder="Enter number of children"
                                            onChange={(value) => handleChange(value, 'children')}
                                        />
                                    </div>
                                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                        <select onChange={handleRoomTypeChange} className="border-0 focus:border-0 bg-white text-black">
                                            <option value="">Select Room Type</option>
                                            <option value="Single Room">Single Room</option>
                                            <option value="Double Room">Double Room</option>
                                            <option value="Triple Room">Triple Room</option>
                                        </select>
                                    </div>
                                    <Button type="submit" className="mt-4">Submit</Button>
                                </form>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="foreground" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                {/* <Button className="bg-[#6f4ef2] shadow-lg shadow-indigo-500/20" onPress={onClose}>
                  Action
                </Button> */}
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
