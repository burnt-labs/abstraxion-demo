import {Fragment, useRef} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {InstantiateResult} from "@cosmjs/cosmwasm-stargate";
import Link from "next/link";

export default function TXSuccessModal({
       isOpen,
       onClose,
       initiateResult,
   }: { isOpen: boolean, onClose: () => void, initiateResult: InstantiateResult | null }) {
    const cancelButtonRef = useRef(null)

    if (!initiateResult) return null;

    // TODO: Link to explorer is only applicable to testnet. Need to change this to be dynamic.
    const blockExplorerUrl = "https://explorer.burnt.com/xion-testnet-1/tx/" + initiateResult.transactionHash;

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel
                                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                            <Dialog.Panel>
                                            <div className="mt-2">
                                                <p className=" text-gray-500">
                                                    <span className="font-bold">Contract Address:</span>
                                                </p>
                                                <p className="text-sm">
                                                    {initiateResult.contractAddress}
                                                </p>
                                            </div>
                                            <div className="mt-2">
                                                <p className=" text-gray-500">
                                                    <span className="font-bold">Block Height:</span>
                                                </p>
                                                <p className="text-sm">
                                                    {initiateResult.height}
                                                </p>
                                            </div>
                                            <div className="mt-2">
                                                <Link href={blockExplorerUrl} target="_blank" className="text-blue-600 hover:text-blue-800 visited:text-purple-600">
                                                    View in Block Explorer
                                                </Link>
                                            </div>
                                            </Dialog.Panel>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        onClick={onClose}
                                        ref={cancelButtonRef}
                                    >
                                        Close
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
