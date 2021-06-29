import "@/styles/tailwind.css";
import type { AppProps } from "next/app";

import dynamic from "next/dynamic";
import Link from "next/link";
import { EditProvider, setEditing, useEditState } from "../utils/editState";

// InnerApp that handles rendering edit mode or not
const InnerApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const { edit } = useEditState();
  if (edit) {
    // Dynamically load Tina only when in edit mode so it does not affect production
    // see https://nextjs.org/docs/advanced-features/dynamic-import#basic-usage
    const TinaWrapper = dynamic(() => import("../components/tina-wrapper"));
    return (
      <>
        <TinaWrapper {...pageProps}>
          {(props) => <Component {...props} />}
        </TinaWrapper>
        <EditToggle isInEditMode={true} />
      </>
    );
  }
  return (
    <>
      <Component {...pageProps} />
      <EditToggle isInEditMode={true} />
    </>
  );
};

const EditToggle = (isInEditMode: boolean) => {
  const { edit, setEdit } = useEditState();
  return (
    <>
      {(Number(process.env.NEXT_PUBLIC_SHOW_EDIT_BTN) || edit) && (
        <>
          <button
            onClick={() => {
              setEdit(!edit);
            }}
            className="fixed top-0 right-0"
          >
            {edit ? "Exit edit mode" : "Enter edit mode"}
          </button>
        </>
      )}
    </>
  );
};

// Our app is wrapped with edit provider
const App = (props: any) => {
  return (
    <EditProvider>
      <InnerApp {...props} />
    </EditProvider>
  );
};

export default App;
