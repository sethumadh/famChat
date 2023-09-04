// import * as React from "react";
// import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
// import * as Dialog from "@radix-ui/react-dialog";
// import { Cross2Icon } from "@radix-ui/react-icons";
// import "./global.css";
// import "./styles.css";

// export default function App() {
//   return (
//     <div style={{ display: "flex", gap: 50 }}>
//       <DropdownWithDialogItemsSolution1 />
//       <DropdownWithDialogItemsSolution2 />
//     </div>
//   );
// }

// function DropdownWithDialogItemsSolution1() {
//   return (
//     <DropdownMenu.Root>
//       <DropdownMenu.Trigger asChild>
//         <button className="Button violet">Actions</button>
//       </DropdownMenu.Trigger>
//       <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
//         <DropdownMenu.Group>
//           <DropdownMenu.Label className="DropdownMenuLabel">Items with dialog</DropdownMenu.Label>
//           <DialogItem triggerChildren="Edit">
//             <Dialog.Title className="DialogTitle">Edit</Dialog.Title>
//             <Dialog.Description className="DialogDescription">
//               Edit this record below.
//             </Dialog.Description>
//             <p>…</p>
//           </DialogItem>

//           <DialogItem triggerChildren="Delete">
//             <Dialog.Title className="DialogTitle">Delete</Dialog.Title>
//             <Dialog.Description className="DialogDescription">
//               Are you sure you want to delete this record?
//             </Dialog.Description>
//           </DialogItem>
//         </DropdownMenu.Group>

//         <DropdownMenu.Separator className="DropdownMenuSeparator" />

//         <DropdownMenu.Group>
//           <DropdownMenu.Label className="DropdownMenuLabel">Regular items</DropdownMenu.Label>
//           <DropdownMenu.Item className="DropdownMenuItem">Duplicate</DropdownMenu.Item>
//           <DropdownMenu.Item className="DropdownMenuItem">Copy</DropdownMenu.Item>
//           <DropdownMenu.Item className="DropdownMenuItem">Save</DropdownMenu.Item>
//         </DropdownMenu.Group>

//         <DropdownMenu.Arrow className="DropdownMenuArrow" />
//       </DropdownMenu.Content>
//     </DropdownMenu.Root>
//   );
// }

// function DropdownWithDialogItemsSolution2() {
//   const [dropdownOpen, setDropdownOpen] = React.useState(false);
//   const [hasOpenDialog, setHasOpenDialog] = React.useState(false);
//   const dropdownTriggerRef = React.useRef(null);
//   const focusRef = React.useRef(null);

//   function handleDialogItemSelect() {
//     focusRef.current = dropdownTriggerRef.current;
//   }

//   function handleDialogItemOpenChange(open) {
//     setHasOpenDialog(open);
//     if (open === false) {
//       setDropdownOpen(false);
//     }
//   }

//   return (
//     <DropdownMenu.Root open={dropdownOpen} onOpenChange={setDropdownOpen}>
//       <DropdownMenu.Trigger asChild>
//         <button className="Button violet" ref={dropdownTriggerRef}>
//           Actions
//         </button>
//       </DropdownMenu.Trigger>
//       <DropdownMenu.Content
//         className="DropdownMenuContent"
//         sideOffset={5}
//         hidden={hasOpenDialog}
//         onCloseAutoFocus={(event) => {
//           if (focusRef.current) {
//             focusRef.current.focus();
//             focusRef.current = null;
//             event.preventDefault();
//           }
//         }}
//       >
//         <DropdownMenu.Group>
//           <DropdownMenu.Label className="DropdownMenuLabel">Items with dialog</DropdownMenu.Label>
//           <DialogItem
//             triggerChildren="Edit"
//             onSelect={handleDialogItemSelect}
//             onOpenChange={handleDialogItemOpenChange}
//           >
//             <Dialog.Title className="DialogTitle">Edit</Dialog.Title>
//             <Dialog.Description className="DialogDescription">
//               Edit this record below.
//             </Dialog.Description>
//             <p>…</p>
//           </DialogItem>

//           <DialogItem
//             triggerChildren="Delete"
//             onSelect={handleDialogItemSelect}
//             onOpenChange={handleDialogItemOpenChange}
//           >
//             <Dialog.Title className="DialogTitle">Delete</Dialog.Title>
//             <Dialog.Description className="DialogDescription">
//               Are you sure you want to delete this record?
//             </Dialog.Description>
//           </DialogItem>
//         </DropdownMenu.Group>

//         <DropdownMenu.Separator className="DropdownMenuSeparator" />

//         <DropdownMenu.Group>
//           <DropdownMenu.Label className="DropdownMenuLabel">Regular items</DropdownMenu.Label>
//           <DropdownMenu.Item className="DropdownMenuItem">Duplicate</DropdownMenu.Item>
//           <DropdownMenu.Item className="DropdownMenuItem">Copy</DropdownMenu.Item>
//           <DropdownMenu.Item className="DropdownMenuItem">Save</DropdownMenu.Item>
//         </DropdownMenu.Group>

//         <DropdownMenu.Arrow className="DropdownMenuArrow" />
//       </DropdownMenu.Content>
//     </DropdownMenu.Root>
//   );
// }

// const DialogItem = React.forwardRef((props, forwardedRef) => {
//   const { triggerChildren, children, onSelect, onOpenChange, ...itemProps } = props;
//   return (
//     <Dialog.Root onOpenChange={onOpenChange}>
//       <Dialog.Trigger asChild>
//         <DropdownMenu.Item
//           {...itemProps}
//           ref={forwardedRef}
//           className="DropdownMenuItem"
//           onSelect={(event) => {
//             event.preventDefault();
//             onSelect && onSelect();
//           }}
//         >
//           {triggerChildren}
//         </DropdownMenu.Item>
//       </Dialog.Trigger>
//       <Dialog.Portal>
//         <Dialog.Overlay className="DialogOverlay" />
//         <Dialog.Content className="DialogContent">
//           {children}
//           <Dialog.Close asChild>
//             <button className="IconButton" aria-label="Close">
//               <Cross2Icon />
//             </button>
//           </Dialog.Close>
//         </Dialog.Content>
//       </Dialog.Portal>
//     </Dialog.Root>
//   );
// });
import React from 'react'

const test = () => {
  return (
    <div>test</div>
  )
}

export default test