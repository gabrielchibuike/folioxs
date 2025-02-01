"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  RefObject,
  useRef,
} from "react";

// Define the shape of your context data
interface MyContextType {
  PopUpModel: RefObject<HTMLDivElement>;
  BankPopUpModel: RefObject<HTMLDivElement>;
  WalletPopUpModel: RefObject<HTMLDivElement>;
  TrashPopUpModel: RefObject<HTMLDivElement>;
  projectLink: any[];
  setProjectLink: React.Dispatch<React.SetStateAction<any[]>>;
  template_one: any[];
  setTemplate_one: React.Dispatch<React.SetStateAction<any[]>>;
  selectedTemplate: any[];
  setSelectedTemplate: React.Dispatch<React.SetStateAction<any[]>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  link: string;
  setLink: React.Dispatch<React.SetStateAction<string>>;
  linkId: string;
  setLinkId: React.Dispatch<React.SetStateAction<string>>;
  getBankDetails: any[];
  setGetBankDetails: React.Dispatch<React.SetStateAction<any[]>>;
}

// Create the context with a default value
const ContextApi = createContext<MyContextType | undefined>(undefined);

export const MyContextProvider = ({ children }: { children: ReactNode }) => {
  const [projectLink, setProjectLink] = useState<any[]>([]);

  const [template_one, setTemplate_one] = useState<any[]>([]);

  const [title, setTitle] = useState<string>("");

  const [link, setLink] = useState<string>("");

  const [linkId, setLinkId] = useState<string>("");

  const [getBankDetails, setGetBankDetails] = useState<any[]>([]);

  const [selectedTemplate, setSelectedTemplate] = useState<any[]>([]);

  const PopUpModel = useRef<HTMLDivElement>(null);

  const BankPopUpModel = useRef<HTMLDivElement>(null);

  const WalletPopUpModel = useRef<HTMLDivElement>(null);

  const TrashPopUpModel = useRef<HTMLDivElement>(null);

  return (
    <ContextApi.Provider
      value={{
        PopUpModel,
        BankPopUpModel,
        WalletPopUpModel,
        TrashPopUpModel,
        selectedTemplate,
        setSelectedTemplate,
        projectLink,
        setProjectLink,
        template_one,
        setTemplate_one,
        title,
        setTitle,
        link,
        setLink,
        linkId,
        setLinkId,
        getBankDetails,
        setGetBankDetails,
      }}
    >
      {children}
    </ContextApi.Provider>
  );
};

export const useMyContext = () => {
  const context = useContext(ContextApi);
  if (context === undefined) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return context;
};
