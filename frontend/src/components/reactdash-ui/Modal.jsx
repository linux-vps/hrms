import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { X } from 'react-bootstrap-icons';
import { Button } from '@/components/reactdash-ui';

export default function Modal(props) {
  // Props ( btn_text, btn_color, title )
  let [isOpen, setIsOpen] = useState(false)
  // close 
  function closeModal() {
    setIsOpen(false)
  }
  // open
  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <div className="relative">
        <Button  onClick={openModal} type="button" color={props.btn_color}>
          {props.btn_text ? props.btn_text : 'Launch modal'}
        </Button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="z-50 relative p-3 mx-auto my-0 max-w-600 mt-12">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="min-w-500 bg-white rounded shadow-lg border flex flex-col overflow-hidden dark:bg-gray-800 dark:border-gray-700">
                  <Dialog.Title as="h3"
                    className="px-6 py-3 text-xl border-b dark:border-gray-700 font-bold">
                    {props.title ? props.title : ''}
                  </Dialog.Title>
                  <button onClick={closeModal} className="fill-current h-6 w-6 absolute ltr:right-0 rtl:left-0 top-0 m-3 font-3xl font-bold"><X /></button>
                  {/* modal content */}
                  <div className="px-6 py-3">
                    {props.children ? props.children : '' }
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}