"use client";
import { FormEvent, Fragment, useState } from "react";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import Image from "next/image";
import { addUserEmailToProduct } from "@/lib/actions";

interface Props{
  productId:string
}
const Modal = ({productId}:Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [email,setEmail]=useState("")
  const [issubmitting,setIsSubmitting]=useState(false)

  
  const openModal = () => setIsOpen(true);

  const closeModal = () => setIsOpen(false);

  const handleSubmit=async (e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    setIsSubmitting(true);
    await addUserEmailToProduct(productId,email)
    setIsSubmitting(false)
    setEmail("")
    closeModal()
  }
  return (
    <>
      <button className="btn" onClick={openModal}>
        Track
      </button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
      <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 dialog-container">
          <DialogPanel className=" dialog-content">
            <div className="flex flex-col">
                <div className="flex justify-between">
                <div className="p-3 border border-gray-200 rounded-10">
                      <Image 
                        src="/assets/icons/logo.svg"
                        alt="logo"
                        width={28}
                        height={28}
                      />
                    </div>

                    <Image 
                      src="/assets/icons/x-close.svg"
                      alt="close"
                      width={24}
                      height={24}
                      className="cursor-pointer"
                      onClick={closeModal}
                    />
                </div>
                <h4 className="dialog-head_text">
                Stay updated with product pricing alerts right in your inbox!
                </h4>
                <p className="text-sm text-gray-600 mt-2">Never miss a bargain again with our timely alerts!</p>

                <form className="flex flex-col mt-5" onSubmit={handleSubmit}>
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">Email address</label>
                    <div className="dialog-input_container">
                        <Image
                            src="/assets/icons/mail.svg"
                            alt="mail"
                            width={20}
                            height={20}
                            />
                        <input 
                            required
                            type="email"
                            placeholder="Enter your email address"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="dialog-input"
                        />
                        
                    </div>
                    <button type="button" className="dialog-btn"> {issubmitting ? 'Submitting...' : 'Track'}</button>
                </form>
            </div>

            
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default Modal;
