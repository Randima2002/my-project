import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, DateRangePicker } from "@nextui-org/react";
import { MdLibraryAdd } from "react-icons/md";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Imgbill from './../../../../public/banner1.jpg';
import Select from 'react-select';
import Review from './../../../../public/review.png';

export default function PopupModel({ action, onUpdateSuccess }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [nic, setNic] = useState('');
    const [contact, setContact] = useState('');
    const [stayDuration, setStayDuration] = useState([]);
    const [adult, setAdult] = useState('');
    const [children, setChildren] = useState('');
    const [roomType, setRoomType] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    // console.log("stayDuration : " + stayDuration);
    const handleRoomTypeChange = (selectedOption) => {
        // setRoomType(event.target.value);
        setRoomType(selectedOption ? selectedOption.value : '');
    };

    function formatDate(dateObj) {
        if (!dateObj || !dateObj.year || !dateObj.month || !dateObj.day) {
            return '';
        }
        console.log("dateObj : " + dateObj)
        const year = dateObj.year;
        const month = dateObj.month.toString().padStart(2, '0');
        const day = dateObj.day.toString().padStart(2, '0');
        return `${year}/${month}/${day}`;
    }

    const loadImage = (src) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = () => resolve(img);
            img.onerror = (err) => reject(err);
        });
    };

    const generatePDF = async (data) => {
        const doc = new jsPDF();
        const element = document.createElement('div');
        element.id = 'bill-content';
        element.innerHTML = `
            

             <div class=" w-[80vw] mx-auto h-auto space-y-3 p-5 pt-4">
        <div class="flex flex-row items-center justify-around ml-44">
                <div class="w-[50%] flex flex-col space-y-2">
                    <label>Customer Name : <span>${data.name}</span></label>
                    <label>Email : <span>${data.email}</span></label>
                    <label>NIC : <span>${data.nic}</span></label>
                    <label>Contact : <span>${data.contact}</span></label>
                </div>
                <div class="w-[50%] flex flex-col space-y-2">
                    <label>Hotel name :  <span>Luxury Hotel </span></label>
                    <label>Address :  <span>No:123,Colombo Road,Negambo</span></label>
                    <label>Contact :  <span>077 456 9874</span></label>
                    <label>Website :  <span>https://www.sample.com</span></label>
                    <label>Email :  <span>luxury@gmail.com</span></label>
                </div>
        </div>
        <div class="w-full  px-10 pt-16">
            <table class="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th class="px-4 py-2 border-b-2 text-left border-gray-200 bg-gray-100">Checking date</th>
                        <th class="px-4 py-2 border-b-2 text-left border-gray-200 bg-gray-100">Checkout date</th>
                        <th class="px-4 py-2 border-b-2 text-left border-gray-200 bg-gray-100">Room type</th>
                        <th class="px-4 py-2 border-b-2 text-left border-gray-200 bg-gray-100">Adults</th>
                        <th class="px-4 py-2 border-b-2 text-left border-gray-200 bg-gray-100">Kids</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="px-4 py-2 border-b border-gray-200">${data.checking_date}</td>
                        <td class="px-4 py-2 border-b border-gray-200">${data.checkout_date}</td>
                        <td class="px-4 py-2 border-b border-gray-200">${data.roomType}</td>
                        <td class="px-4 py-2 border-b border-gray-200">${data.adult}</td>
                        <td class="px-4 py-2 border-b border-gray-200">${data.child}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class=" text-center  pb-2 pt-[180px] text-4xl font-bold">Thank You Come Again </div>
    </div>
        `;

        document.body.appendChild(element);

        const reviewImg = await loadImage('/review.png');

        const margin = 5;
        const imageWidth = 30; // Adjust as needed
        const imageHeight = 30; // Adjust as needed

        // Add the review image to the top right
        const canvas = await html2canvas(element);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        const x = (pdfWidth - imageWidth) / 2;
        doc.addImage(reviewImg, 'PNG', x , margin, imageWidth, imageHeight);
        doc.addImage(imgData, 'PNG', 10, 40, 190, 0);

        doc.save('booking_bill.pdf');

        document.body.removeChild(element);
        const pdfBlob = doc.output('blob');

        const pdfUrl = URL.createObjectURL(pdfBlob);

        return pdfUrl;
    };



    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');
        const data = {
            name,
            email,
            nic,
            contact,
            checking_date: formatDate(stayDuration.start).toString(),
            checkout_date: formatDate(stayDuration.end).toString(),
            adult,
            child: children,
            roomType
        };
        console.log("data const complete..! : " + data);

        try {
            const response = await fetch('/api/booking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('API response error:', errorData);
                throw new Error('Error creating booking');
            }

            const result = await response.json();
            setSuccess('Booking created successfully!');
            // console.log("result is  : " + result)
            // console.log("Data is : " + data)
            onUpdateSuccess();
            const pdfUrl = await generatePDF(data);  // Generate PDF
            const pdfFilePath = `C:/Users/ADMIN/Desktop/pdf/${pdfUrl}`;
            // const whatsappUrl = `https://api.whatsapp.com/send?phone=${contact}&text=Here%20is%20your%20booking%20confirmation:%20${pdfUrl}`;
            const whatsappUrl = `https://api.whatsapp.com/send?phone=${contact}&text=Here%20is%20your%20booking%20confirmation:%20${pdfFilePath}`
            window.open(whatsappUrl, '_blank');
            setRoomType(null)
            onOpenChange(false);
            setSuccess(null);
            setError(null)
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const customStyles = {
        control: (provided) => ({
            ...provided,
            border: 'none',
            boxShadow: 'none',
            width: '100%',
            backgroundColor: 'white',
            color: 'black',
            borderRadius: '10px',
            padding: '10px 1rem',
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? 'green' : 'white',
            color: state.isSelected ? 'white' : 'black',
            padding: '10px 1rem',
            width: '100%',

        }),
        singleValue: (provided) => ({
            ...provided,
            color: 'black',
        }),
    };

    const options = [
        { value: 'Single Room AC', label: 'Single Room AC' },
        { value: 'Single Room Non AC', label: 'Single Room Non AC' },
        { value: 'Double Room AC', label: 'Double Room AC' },
        { value: 'Double Room Non AC', label: 'Double Room Non AC' },
        { value: 'Triple Room AC', label: 'Triple Room AC' },
        { value: 'Triple Room Non AC', label: 'Triple Room Non AC' },
    ];


    return (
        <>
            <Button onPress={onOpen} className="bg-black text-white w-fit font-bold px-5 py-2 my-auto">Add New</Button>
            <Modal
                backdrop="opaque"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                radius="lg"
                size="3xl"
                placement="top"
                classNames={{
                    body: "py-4 p-5",
                    backdrop: "bg-[#fafafc]/50 backdrop-opacity-40",
                    base: "border-[#fafafc] bg-[#f0af3e] dark:bg-[#FFFFFF] text-[#19172c]",
                    header: "border-b-[1px] border-[#000]",
                    footer: "border-t-[1px] border-[#000]",
                    closeButton: "hover:bg-white/5 active:bg-white/10",
                }}
                style={{ display: action ? 'flex' : 'none' }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <div className="flex flex-row gap-1 pl-8">
                                <div className="text-3xl my-auto">
                                    <MdLibraryAdd />
                                </div>
                                <ModalHeader className="flex flex-col gap-1 px-4 text-black">Add New Booking</ModalHeader>
                            </div>

                            <ModalBody className="text-white">
                                <form onSubmit={handleSubmit} className="text-white p-6 pb-0">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex w-full flex-wrap laptop:flex-nowrap gap-4">
                                            <Input
                                                type="text"
                                                className="border-0 focus:border-0 mb-3 laptop:mb-0 w-full bg-white text-black rounded-xl gap-"
                                                name="name"
                                                placeholder="Enter name"
                                                required
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>

                                        <div className="flex w-full flex-wrap laptop:flex-nowrap gap-4">
                                            <Input
                                                type="email"
                                                className="border-0 focus:border-0 mb-3 laptop:mb-0 w-full bg-white text-black rounded-xl gap-4"
                                                name="email"
                                                required
                                                placeholder="Enter email"
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                        <div className="flex w-full flex-wrap laptop:flex-nowrap gap-4">
                                            <Input
                                                type="text"
                                                className="border-0 focus:border-0 mb-4 laptop:mb-0 w-full bg-white text-black rounded-xl"
                                                name="nic"
                                                required
                                                placeholder="Enter NIC"
                                                onChange={(e) => setNic(e.target.value)}
                                            />
                                        </div>
                                        <div className="flex w-full flex-wrap laptop:flex-nowrap gap-4">
                                            <Input
                                                type="text"
                                                className="border-0 focus:border-0 mb-4 laptop:mb-0 w-full bg-white text-black rounded-xl"
                                                name="contact"
                                                required
                                                placeholder="Enter contact number as  9470123456"
                                                onChange={(e) => setContact(e.target.value)}
                                            />
                                        </div>
                                        <div className="flex w-full flex-wrap laptop:flex-nowrap gap-4">
                                            <Input
                                                type="text"
                                                className="border-0 focus:border-0 mb-4 laptop:mb-0 w-full bg-white text-black rounded-xl"
                                                name="adult"
                                                required
                                                placeholder="Enter number of adults"
                                                onChange={(e) => setAdult(e.target.value)}
                                            />
                                        </div>
                                        <div className="flex w-full flex-wrap laptop:flex-nowrap gap-4">
                                            <Input
                                                type="text"
                                                className="border-0 focus:border-0 mb-4 laptop:mb-0 w-full bg-white text-black rounded-xl"
                                                name="children"
                                                required
                                                placeholder="Enter number of children"
                                                onChange={(e) => setChildren(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <DateRangePicker
                                                label="Set Stay duration"
                                                className="max-w-full mb-4 laptop:mb-0 w-full"
                                                name="stayduration"
                                                required
                                                onChange={(e) => setStayDuration(e)}
                                            />
                                        </div>
                                        <div className="flex w-full flex-wrap laptop:flex-nowrap gap-4">
                                            {/* <select
                                                onChange={handleRoomTypeChange}
                                                className="border-0 focus:border-0 w-full bg-white text-black mb-4 laptop:mb-0 rounded-xl px-4 py-2"
                                            >
                                                <option value="">Select Room Type</option>
                                                <option value="Single Room AC" className=" bg-red-300 my-10">Single Room AC</option>
                                                <option value="Single Room Non AC">Single Room Non AC</option>
                                                <option value="Double Room AC">Double Room AC</option>
                                                <option value="Double Room Non AC">Double Room Non AC</option>
                                                <option value="Triple Room AC">Triple Room AC</option>
                                                <option value="Triple Room Non AC">Triple Room Non AC</option>
                                            </select> */}
                                            <Select
                                                value={options.find(option => option.value === roomType)}
                                                onChange={handleRoomTypeChange}
                                                options={options}
                                                styles={customStyles}
                                                placeholder="Select room type"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-row w-full justify-end gap-4 mt-10">
                                        <Button type="submit" className="btn-primary bg-white text-black" disabled={loading}>
                                            {loading ? 'Submitting...' : 'Submit'}
                                        </Button>
                                        <Button className="btn-primary bg-white text-black" onPress={onClose}>
                                            Close
                                        </Button>
                                    </div>
                                </form>
                                {error && <p style={{ color: 'red' }}>{error}</p>}
                                {success && <p style={{ color: 'green' }}>{success}</p>}
                            </ModalBody>
                            <ModalFooter></ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
