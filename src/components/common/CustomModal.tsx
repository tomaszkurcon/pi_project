import { Modal, ModalProps, Portal } from "@mantine/core"

const CustomModal = ({children,...props}: ModalProps) => {

    return (
        <Portal target="#modals">
            <Modal {...props}>
                {children}
            </Modal>
        </Portal>
    )
}

export default CustomModal;