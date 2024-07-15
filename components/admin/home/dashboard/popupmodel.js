// import React, { useState } from "react";
// import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
// import { Input } from "@nextui-org/react";
// import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
// import { DateRangePicker } from "@nextui-org/react";
// import { MdLibraryAdd } from "react-icons/md";
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

// export default function popupmodel({ action, onUpdateSuccess }) {
//     const { isOpen, onOpen, onOpenChange } = useDisclosure();
//     const [name, setName] = useState(' ')
//     const [email, setemail] = useState(' ')
//     const [nic, setnic] = useState(' ')
//     const [contact, setcontact] = useState(' ')
//     const [stayDuration, setstayDuration] = useState([])
//     const [adult, setadult] = useState(' ')
//     const [children, setachildren] = useState(' ')
//     const [roomType, setroomType] = useState(' ')

//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(' ');
//     const [success, setSuccess] = useState(' ');


//     const handleRoomTypeChange = (event) => {
//         const { value } = event.target;
//         // console.log("Room type selected:", value);
//         setroomType({ ...roomType, room: value });
//         // setroomType(value);
//     };

//     // console.log(stayDuration)
//     function formatDate(dateObj) {
//         if (!dateObj || !dateObj.year || !dateObj.month || !dateObj.day) {
//             return ''; // Return an empty string or handle the error as needed
//         }
//         const year = dateObj.year;
//         const month = dateObj.month.toString().padStart(2, '0');
//         const day = dateObj.day.toString().padStart(2, '0');
//         return `${year}/${month}/${day}`;
//     }


//     const generatePDF = async (data) => {
//         const doc = new jsPDF();
//         const element = document.getElementById('bill-content');
//         const canvas = await html2canvas(element);
//         const imgData = canvas.toDataURL('image/png');
//         doc.addImage(imgData, 'PNG', 10, 10, 190, 0);
//         doc.save('booking_bill.pdf');
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         setLoading(true);
//         setError('');
//         setSuccess('');
//         const data = {
//             name,
//             email,
//             nic,
//             contact,
//             checking_date: formatDate(stayDuration.start).toString(),
//             checkout_date: formatDate(stayDuration.end).toString(),
//             adult: adult,
//             child: children,
//             roomType: roomType.room
//         }
//         console.log("data const complete..!")
//         try {
//             const response = await fetch('/api/booking', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(data),
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 console.error('API response error:', errorData);
//                 throw new Error('Error creating booking');
//             }

//             const result = await response.json();
//             setSuccess('Booking created successfully!');
//             setName(" ");
//             setemail(" ");
//             setnic(" ");
//             setcontact(" ");
//             setstayDuration(" ");
//             setadult(" ");
//             setachildren(" ");
//             setroomType(" ");
//             await generatePDF(data);  // Generate PDF
//             window.open(`https://web.whatsapp.com/send?phone=${contact}`, '_blank');  
//             onUpdateSuccess();
//         } catch (error) {
//             setError(error.message);
//         } finally {
//             setLoading(false);
//         }
//     };


//     return (
//         <>
//             <Button onPress={onOpen} className="bg-black text-white w-fit font-bold px-5 py-2 my-auto">Add New</Button>
//             <Modal
//                 backdrop="opaque"
//                 isOpen={isOpen}
//                 onOpenChange={onOpenChange}
//                 radius="lg"
//                 size="3xl"
//                 placement="top"
//                 classNames={{
//                     body: "py-4 p-5",
//                     backdrop: "bg-[#fafafc]/50 backdrop-opacity-40",
//                     base: "border-[#fafafc] bg-[#f0af3e] dark:bg-[#FFFFFF] text-[#19172c]",
//                     header: "border-b-[1px] border-[#000]",
//                     footer: "border-t-[1px] border-[#000]",
//                     closeButton: "hover:bg-white/5 active:bg-white/10",
//                 }}
//                 style={{ display: action ? 'flex' : 'none' }}
//             >
//                 <ModalContent>
//                     {(onClose) => (
//                         <>

//                             <div className=" flex flex-row gap-1 pl-8">
//                                 <div className="text-3xl my-auto">
//                                     <MdLibraryAdd />
//                                 </div>
//                                 <ModalHeader className="flex flex-col gap-1 px-4 text-black">Add New Booking
//                                 </ModalHeader>

//                             </div>

//                             <ModalBody className="text-white">
//                                 <form onSubmit={handleSubmit} className="text-white p-6 pb-0 ">
//                                     <div className=" grid grid-cols-2 gap-4">
//                                         <div className="flex w-full flex-wrap laptop:flex-nowrap gap-4">
//                                             <Input
//                                                 type="text"
//                                                 className="border-0 focus:border-0 mb-3 laptop:mb-0 w-full bg-white text-black rounded-xl gap-"
//                                                 name="name"
//                                                 placeholder="Enter name"
//                                                 required 
//                                                 onChange={(e) => setName(e.target.value)}
//                                             />
//                                         </div>

//                                         <div className="flex w-full flex-wrap laptop:flex-nowrap gap-4">
//                                             <Input
//                                                 type="email"
//                                                 className="border-0 focus:border-0 mb-3 laptop:mb-0 w-full bg-white text-black rounded-xl gap-4"
//                                                 name="email"
//                                                 required 
//                                                 placeholder="Enter email"
//                                                 onChange={(e) => setemail(e.target.value)}
//                                             />
//                                         </div>
//                                         <div className="flex w-full flex-wrap laptop:flex-nowrap gap-4">
//                                             <Input
//                                                 type="text"
//                                                 className="border-0 focus:border-0 mb-4 laptop:mb-0 w-full bg-white text-black rounded-xl"
//                                                 name="nic"
//                                                 required 
//                                                 placeholder="Enter NIC"
//                                                 onChange={(e) => setnic(e.target.value)}
//                                             />

//                                         </div>
//                                         <div className="flex w-full flex-wrap laptop:flex-nowrap gap-4">
//                                             <Input
//                                                 type="text"
//                                                 className="border-0 focus:border-0 mb-4 laptop:mb-0 w-full bg-white text-black rounded-xl"
//                                                 name="contact"
//                                                 required 
//                                                 placeholder="Enter contact number"
//                                                 onChange={(e) => setcontact(e.target.value)}
//                                             />
//                                         </div>
//                                         <div className="flex w-full flex-wrap laptop:flex-nowrap gap-4">
//                                             <Input
//                                                 type="text"
//                                                 className="border-0 focus:border-0 mb-4 laptop:mb-0 w-full bg-white text-black rounded-xl"
//                                                 name="adult"
//                                                 required 
//                                                 placeholder="Enter number of adults"
//                                                 onChange={(e) => setadult(e.target.value)}
//                                             />
//                                         </div>
//                                         <div className="flex w-full flex-wrap laptop:flex-nowrap gap-4">
//                                             <Input
//                                                 type="text"
//                                                 className="border-0 focus:border-0 mb-4 laptop:mb-0 w-full bg-white text-black rounded-xl"
//                                                 name="children"
//                                                 required 
//                                                 placeholder="Enter number of children"
//                                                 onChange={(e) => setachildren(e.target.value)}
//                                             />
//                                         </div>
//                                         <div>
//                                             <DateRangePicker
//                                                 label="Set Stay duration"
//                                                 className="max-w-full mb-4 laptop:mb-0 w-full"
//                                                 name="stayduration"
//                                                 required 
//                                                 onChange={(e) => setstayDuration(e)}
//                                             />
//                                         </div>
//                                         <div className="flex w-full flex-wrap laptop:flex-nowrap gap-4">
//                                             <select
//                                                 onChange={handleRoomTypeChange}
//                                                 className="border-0 focus:border-0 w-full bg-white text-black mb-4 laptop:mb-0 rounded-xl px-4 py-2"
//                                             >
//                                                 <option value="">Select Room Type</option>
//                                                 <option value="Single Room AC">Single Room AC</option>
//                                                 <option value="Single Room Non AC">Single Room Non AC</option>
//                                                 <option value="Double Room AC">Double Room AC</option>
//                                                 <option value="Double Room Non AC">Double Room Non AC</option>
//                                                 <option value="Triple Room AC">Triple Room AC</option>
//                                                 <option value="Triple Room Non AC">Triple Room Non AC</option>
//                                             </select>
//                                         </div>
//                                     </div>
//                                     <div id="bill-content" className="hidden">
//                                         <h1>Booking Bill</h1>
//                                         <p>Name: {name}</p>
//                                         <p>Email: {email}</p>
//                                         <p>NIC: {nic}</p>
//                                         <p>Contact: {contact}</p>
//                                         <p>Stay Duration: {formatDate(stayDuration.start)} - {formatDate(stayDuration.end)}</p>
//                                         <p>Adults: {adult}</p>
//                                         <p>Children: {children}</p>
//                                         <p>Room Type: {roomType}</p>
//                                     </div>
//                                     <div className="flex flex-row w-full justify-end gap-4 mt-10">
//                                         <Button type="submit" className=" btn-primary bg-white text-black " disabled={loading}>
//                                             {loading ? 'Submitting...' : 'Submit'}
//                                         </Button>
//                                         <Button className="btn-primary bg-white text-black " onPress={onClose}>
//                                             Close
//                                         </Button>

//                                     </div>
//                                 </form>
//                                 {error && <p style={{ color: 'red' }}>{error}</p>}
//                                 {success && <p style={{ color: 'green' }}>{success}</p>}
//                             </ModalBody>
//                             <ModalFooter>
//                                 {/* <Button color="foreground" variant="light" onPress={onClose}>
//                                     Close
//                                 </Button> */}

//                             </ModalFooter>
//                         </>
//                     )}
//                 </ModalContent>
//             </Modal>
//         </>
//     );
// }

import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, DateRangePicker } from "@nextui-org/react";
import { MdLibraryAdd } from "react-icons/md";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function PopupModel({ action, onUpdateSuccess }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [nic, setNic] = useState('');
    const [contact, setContact] = useState('');
    const [stayDuration, setStayDuration] = useState({});
    const [adult, setAdult] = useState('');
    const [children, setChildren] = useState('');
    const [roomType, setRoomType] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRoomTypeChange = (event) => {
        setRoomType(event.target.value);
    };

    function formatDate(date) {
        if (!date) return '';
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}/${month}/${day}`;
    }

    const generatePDF = async (data) => {
        const doc = new jsPDF();
        const element = document.createElement('div');
        element.id = 'bill-content';
        element.innerHTML = `
            <h1>Booking Bill</h1>
            <p>Name: ${data.name}</p>
            <p>Email: ${data.email}</p>
            <p>NIC: ${data.nic}</p>
            <p>Contact: ${data.contact}</p>
            <p>Check-in Date: ${data.checking_date}</p>
            <p>Check-out Date: ${data.checkout_date}</p>
            <p>Number of Adults: ${data.adult}</p>
            <p>Number of Children: ${data.child}</p>
            <p>Room Type: ${data.roomType}</p>
        `;
        document.body.appendChild(element);
    
        const canvas = await html2canvas(element);
        const imgData = canvas.toDataURL('image/png');
        doc.addImage(imgData, 'PNG', 10, 10, 190, 0);
    
        // Save PDF locally
        doc.save('booking_bill.pdf');
    
        document.body.removeChild(element);
        const pdfBlob = doc.output('blob');
    
        // Create a URL for the PDF blob
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
            checking_date: formatDate(stayDuration.startDate),
            checkout_date: formatDate(stayDuration.endDate),
            adult,
            child: children,
            roomType
        };
        console.log("data const complete..!");

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
            setName('');
            setEmail('');
            setNic('');
            setContact('');
            setStayDuration({});
            setAdult('');
            setChildren('');
            setRoomType('');
            const pdfUrl = await generatePDF(data);  // Generate PDF
            // const whatsappUrl = `https://api.whatsapp.com/send?phone=${contact}&text=Here%20is%20your%20booking%20confirmation:%20${pdfUrl}`;
            const whatsappUrl = `https://api.whatsapp.com/send?phone=${contact}&text=Here%20is%20your%20booking%20confirmation:%20${pdfUrl}`
            window.open(whatsappUrl, '_blank');  // Open WhatsApp link
            onUpdateSuccess();
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

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
                                                onChange={(range) => setStayDuration(range)}
                                            />
                                        </div>
                                        <div className="flex w-full flex-wrap laptop:flex-nowrap gap-4">
                                            <select
                                                onChange={handleRoomTypeChange}
                                                className="border-0 focus:border-0 w-full bg-white text-black mb-4 laptop:mb-0 rounded-xl px-4 py-2"
                                            >
                                                <option value="">Select Room Type</option>
                                                <option value="Single Room AC">Single Room AC</option>
                                                <option value="Single Room Non AC">Single Room Non AC</option>
                                                <option value="Double Room AC">Double Room AC</option>
                                                <option value="Double Room Non AC">Double Room Non AC</option>
                                                <option value="Triple Room AC">Triple Room AC</option>
                                                <option value="Triple Room Non AC">Triple Room Non AC</option>
                                            </select>
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
