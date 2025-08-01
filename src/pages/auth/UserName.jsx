'use client'

import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { AtSign, Sparkles } from 'lucide-react'
import CustomButton from '../../Reusables/CustomButton'
import TextInputField from '../../Reusables/TextInputField'


export default function UserName() {
    const [open, setOpen] = useState(true)
    const [username, setUsername] = useState("");
    const [touched, setTouched] = useState({});
    const [validationErrors, setValidationErrors] = useState({});


    return (
        <div>
            <Dialog open={open} onClose={setOpen} className="relative z-10">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg w-full data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                        >
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="text-center">
                                    <div className='w-full flex items-center flex-col'>
                                        <div className=" flex size-12 shrink-0 items-center justify-center rounded-full bg-gray-100 sm:mx-0 sm:size-10">
                                            <Sparkles />
                                        </div>
                                    </div>

                                    <div className="text-center sm:mt-0 sm:text-left w-full">
                                        <DialogTitle as="h3" className="text-2xl/9 font-medium tracking-tight text-gray-900 text-center mt-4">
                                            What should we call you?
                                        </DialogTitle>

                                        <div className="my-5">
                                            <TextInputField
                                                id="username"
                                                name="username"
                                                required
                                                autoComplete="current-username"
                                                value={username}
                                                iconStart={<AtSign size={20} />}
                                                onChange={(e) => {
                                                    setUsername(e.target.value);
                                                    validateField("username", e.target.value);
                                                }}
                                                onBlur={() => setTouched((prev) => ({ ...prev, username: true }))}
                                                type="text"
                                                label="Username"
                                                placeholder="danielafriheart"
                                                touched={touched.username}
                                                error={validationErrors.username}
                                            />
                                        </div>

                                        <CustomButton type="submit" className="btn-primary">
                                            Continue
                                        </CustomButton>
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}
