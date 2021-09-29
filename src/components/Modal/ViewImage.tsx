import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal isOpen={isOpen} onClose={onClose} >
      <ModalOverlay />
      <ModalContent
        mx="auto"
        w="auto"
        h="auto"
        maxW={900}
        maxH={600}
      >
        <ModalBody p="0">
          <Image
            src={imgUrl}
            maxW={900}
            maxH={600}
          />
        </ModalBody>
        <ModalFooter justifyContent="flex-start" p='2' bg="pGray.800" borderBottomRadius="6px">
          <Link href={imgUrl} target="_blank">Abrir original</Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
