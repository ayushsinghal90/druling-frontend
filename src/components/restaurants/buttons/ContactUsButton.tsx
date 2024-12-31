import React from "react";
import { Phone } from "lucide-react";
import { Button } from "../../ui/Button";

const ContactUsButton = ({
  setShowContactModal,
}: {
  setShowContactModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <>
    <Button
      onClick={() => setShowContactModal(true)}
      type="button"
      variant="outline"
      className="hidden sm:block px-4 py-2 text-sm font-medium"
    >
      Contact Us
    </Button>
    <Button
      onClick={() => setShowContactModal(true)}
      type="button"
      variant="outline"
      className="sm:hidden"
      aria-label="Contact Us"
    >
      <Phone className="h-5 w-5" />
    </Button>
  </>
);

export default ContactUsButton;
