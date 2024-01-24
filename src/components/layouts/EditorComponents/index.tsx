/* The following code is a TypeScript React component that imports various dependencies and libraries for
creating a rich text editor. It defines a functional component that renders an editor interface with
various formatting options such as bold, italic, underline, alignment, subscript, superscript,
highlighting, strikethrough, code, quotes, lists, fonts, headings, links, and more. */
import React, { useState, useRef, useEffect } from "react";
import {
    convertToRaw,
    CompositeDecorator,
    Editor,
    EditorState,
    RichUtils,
    DraftHandleValue,
} from "draft-js";
//import { stateToHTML } from 'draft-js-export-html';
import jsPDF from 'jspdf';
import StateToPdfMake from "draft-js-export-pdfmake";
import pdfMake from "pdfmake/build/pdfmake";
// import pdfFonts from "pdfmake/build/vfs_fonts";
// pdfMake.vfs = pdfFonts.pdfMake.vfs;
import CheckIcon from '@mui/icons-material/Check';
import ReplyIcon from '@mui/icons-material/Reply';
import {
    faBold,
    faItalic,
    faUnderline,
    faAlignLeft,
    faAlignCenter,
    faAlignRight,
    faAlignJustify,
    faPalette,
    faSubscript,
    faSuperscript,
    faHighlighter,
    faStrikethrough,
    faCode,
    faQuoteLeft,
    faListUl,
    faListOl,
    faFont,
    faHeading,
    faQuoteRight,
    faCheck,
    faLink,
    faUpLong,
    faArrowUp,
    faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import CommentsDisabledIcon from '@mui/icons-material/CommentsDisabled';
import AddCommentIcon from '@mui/icons-material/AddComment';
// import jsonBeautify from "json-beautify";
import { convertFromRaw, Modifier } from "draft-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { TokenInfo, getToken } from "@/store/customeHook/token";
import useApiFetch from "@/store/customeHook/useApiFetch";
import usePutApi from "@/store/customeHook/putApi";
import { messageView, messageViewNew } from "@/store/customeHook/validate";
import { ToastContainer } from "react-toastify";
// import TemporaryDrawer from "./Drawer";
import ChatModal from "./ChatModal";
// import UploadModal from "./UploadModal";
import html2canvas from 'html2canvas';
import { useLocation, useParams } from "react-router-dom";
import usePostApi from "@/store/customeHook/postApi";

/* The following code is defining an interface called `LinkData` in TypeScript. This interface has a single
property called `url` which is of type `string`. This interface can be used to define the structure
of objects that have a `url` property. */
interface LinkData {
    url: string;
}

/* The below code is defining an object called `INLINE_STYLES` in TypeScript. This object contains
various styles for text transformation and colors. The `UPPERCASE` style transforms text to
uppercase, the `LOWERCASE` style transforms text to lowercase. The `TEXT_COLOR` style represents a
class name for applying a text color, and the `HIGHLIGHT_COLOR` style represents a class name for
applying a highlight color. */
const INLINE_STYLES = {
    UPPERCASE: { textTransform: 'uppercase' },
    LOWERCASE: { textTransform: 'lowercase' },
    TEXT_COLOR: 'text-color',
    HIGHLIGHT_COLOR: 'highlight-color',
};

/* The following code is defining a constant object called `BLOCK_TYPES` in TypeScript. This object
contains various block types used in a React application. The block types include different header
levels (`HEADER_ONE` to `HEADER_SIX`) and an `UNSTYLED` type. These block types can be used to style
and format text in a React application. */
const BLOCK_TYPES = {
    HEADER_ONE: 'header-one',
    HEADER_TWO: 'header-two',
    HEADER_THREE: 'header-three',
    HEADER_FOUR: 'header-four',
    HEADER_FIVE: 'header-five',
    HEADER_SIX: 'header-six',
    UNSTYLED: 'unstyled',

};

/* The above code is defining a constant object called `BLOCK_STYLES` in TypeScript. This object
contains four properties, each representing a different text alignment style: `TEXT_ALIGN_LEFT`,
`TEXT_ALIGN_CENTER`, `TEXT_ALIGN_RIGHT`, and `TEXT_ALIGN_JUSTIFY`. These properties are assigned
string values that can be used to apply the corresponding text alignment style to elements in a
React application. */
const BLOCK_STYLES = {
    TEXT_ALIGN_LEFT: 'text-align-left',
    TEXT_ALIGN_CENTER: 'text-align-center',
    TEXT_ALIGN_RIGHT: 'text-align-right',
    TEXT_ALIGN_JUSTIFY: 'text-align-justify',
};

/* The below code is defining an interface called `LinkEntity` in TypeScript for a React application.
The interface has three properties: `type`, `mutability`, and `data`. The `type` property is of type
string and is set to "LINK". The `mutability` property is also of type string and is set to
"MUTABLE". The `data` property is of type `LinkData`, which is not defined in the given code
snippet. */
interface LinkEntity {
    type: "LINK";
    mutability: "MUTABLE";
    data: LinkData;
}

/**
 * The function `findLinkEntities` is used in a TypeScript React application to find and identify link
 * entities within a content block.
 * @param {any} contentBlock - The `contentBlock` parameter represents a block of content in a text
 * editor or document. It contains the text and any associated entities (such as links, mentions, etc.)
 * within that block.
 * @param callback - The `callback` parameter is a function that will be called for each entity range
 * found in the `contentBlock`. It takes two parameters: `start` and `end`, which represent the start
 * and end positions of the entity range within the `contentBlock`.
 * @param {any} contentState - The `contentState` parameter represents the current state of the content
 * in the editor. It contains information about the entities and their types, as well as the text and
 * styles of the content.
 */
function findLinkEntities(
    contentBlock: any,
    callback: (start: number, end: number) => void,
    contentState: any
) {
    contentBlock.findEntityRanges((character: any) => {
        const entityKey = character.getEntity();
        return (
            entityKey !== null &&
            contentState.getEntity(entityKey).getType() === "LINK"
        );
    }, callback);
}

// let modal1: any = false;
let url1: any = ''
const Link: React.FC<any> = (props) => {
    const { modal,setModal } = props;
    const { url, user } = props.contentState.getEntity(props.entityKey).getData();
    const [showTooltip, setShowTooltip] = useState(false);
  
    const handleMouseEnter = () => {
      setShowTooltip(true);
    };
  
    const handleMouseLeave = () => {
      setShowTooltip(false);
    };
  
  console.log("YYYYYYYYYYY",props.contentState.getEntity(props.entityKey).getData());
  
    return (
      <span
        style={{
          textDecoration: "underline",
          cursor: "pointer",
          fontSize: "16px",
          fontFamily: "Arial, sans-serif",
          fontWeight: "bold",
          textAlign: "center",
          color: "black",
          position: "relative", // Make the parent element relative
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {props.children}
        {showTooltip && (
          <div
            style={{
              position: "absolute", // Make the tooltip absolute
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              color: "white",
              padding: "2px 8px",
              borderRadius: "4px",
              // transform: "translateX(30%)",
              zIndex: 999,
              top: "100%", // Position the tooltip below the parent
              left: "50%", // Center the tooltip horizontally
              transform: "translateX(-50%)", // Center the tooltip horizontally
            }}
          >
            {user ? user : "User"}:{url}
            <Button onClick={() => { setModal(true); url1 = url }}>
              <ReplyIcon />
            </Button>
          </div>
        )}
      </span>
  
    );
  };

const Toolbar: React.FC<{
    onBoldClick: () => void;
    onItalicClick: () => void;
    onUnderlineClick: () => void;
    onTextAlign: (alignment: string) => void;
    onTextColor: (color: string) => void;
    promptForLink: () => void;
    linkInputVisible: boolean;
    linkUrl: string;
    setLinkUrl: (url: string) => void;
    confirmLink: () => void;
    onSubscriptClick: () => void;
    onSuperscriptClick: () => void;
    onHighlightClick: () => void;
    onStrikethroughClick: () => void;
    onMonospaceClick: () => void;
    onBlockquoteClick: () => void;
    onUnorderedListClick: () => void;
    onOrderedListClick: () => void;
    onCodeBlockClick: () => void;
    onUppercaseClick: () => void;
    onLowercaseClick: () => void;
    onHeadingClick: (level: number) => void;
}> = ({
    onBoldClick,
    onItalicClick,
    onUnderlineClick,
    onTextAlign,
    onTextColor,
    promptForLink,
    linkInputVisible,
    linkUrl,
    setLinkUrl,
    confirmLink,
    onSubscriptClick,
    onSuperscriptClick,
    onHighlightClick,
    onStrikethroughClick,
    onMonospaceClick,
    onBlockquoteClick,
    onUnorderedListClick,
    onOrderedListClick,
    onCodeBlockClick,
    onUppercaseClick,
    onLowercaseClick,
    onHeadingClick,
}) => {
        /* The below code is rendering a toolbar component in a TypeScript React application. The
        toolbar consists of various buttons that perform different text formatting actions when
        clicked. These actions include making the text bold, italic, underlined, aligned (left,
        center, right, justify), subscript, superscript, highlighted, strikethrough, monospace,
        blockquote, unordered list, ordered list, uppercase, lowercase, and heading (H1-H6). There
        is also an input field for selecting the text color. */
        return (
            <div>
                <div>
                    <button onMouseDown={onBoldClick}>
                        <FontAwesomeIcon icon={faBold} />
                    </button>
                    <button onMouseDown={onItalicClick}>
                        <FontAwesomeIcon icon={faItalic} />
                    </button>
                    <button onMouseDown={onUnderlineClick}>
                        <FontAwesomeIcon icon={faUnderline} />
                    </button>
                    <button onMouseDown={() => onTextAlign("left")}>
                        <FontAwesomeIcon icon={faAlignLeft} />
                    </button>
                    <button onMouseDown={() => onTextAlign("center")}>
                        <FontAwesomeIcon icon={faAlignCenter} />
                    </button>
                    <button onMouseDown={() => onTextAlign("right")}>
                        <FontAwesomeIcon icon={faAlignRight} />
                    </button>
                    <button onMouseDown={() => onTextAlign("justify")}>
                        <FontAwesomeIcon icon={faAlignJustify} />
                    </button>
                    <button onMouseDown={onSubscriptClick}>
                        <FontAwesomeIcon icon={faSubscript} />
                    </button>
                    <button onMouseDown={onSuperscriptClick}>
                        <FontAwesomeIcon icon={faSuperscript} />
                    </button>
                    <button onMouseDown={onHighlightClick}>
                        <FontAwesomeIcon icon={faHighlighter} />
                    </button>
                    <button onMouseDown={onStrikethroughClick}>
                        <FontAwesomeIcon icon={faStrikethrough} />
                    </button>
                    <button onMouseDown={onMonospaceClick}>
                        <FontAwesomeIcon icon={faCode} />
                    </button>
                    <button onMouseDown={onBlockquoteClick}>
                        <FontAwesomeIcon icon={faQuoteLeft} />
                    </button>
                    <button onMouseDown={onUnorderedListClick}>
                        <FontAwesomeIcon icon={faListUl} />
                    </button>
                    <button onMouseDown={onOrderedListClick}>
                        <FontAwesomeIcon icon={faListOl} />
                    </button>
                    {/* <button onMouseDown={onCodeBlockClick}>
                        <FontAwesomeIcon icon={faCode} />
                    </button> */}
                    <button onMouseDown={onUppercaseClick}>
                        <FontAwesomeIcon icon={faArrowUp} />
                    </button>
                    <button onMouseDown={onLowercaseClick}>
                        <FontAwesomeIcon icon={faArrowDown} />
                    </button>
                    <button onMouseDown={() => onHeadingClick(1)}>
                        <b>H1</b>
                    </button>
                    <button onMouseDown={() => onHeadingClick(2)}>
                        <b>H2</b>
                    </button>
                    <button onMouseDown={() => onHeadingClick(3)}>
                        <b>H3</b>
                    </button>
                    <button onMouseDown={() => onHeadingClick(4)}>
                        <b>H4</b>
                    </button>
                    <button onMouseDown={() => onHeadingClick(5)}>
                        <b>H5</b>
                    </button>
                    <button className="mt-2" onMouseDown={() => onHeadingClick(6)}>
                        <b>H6</b>
                    </button>
                    <input
                        type="color"
                        value="#000000"
                        className="h-[55px] w-[45px] pt-1 absolute"
                        onChange={(e) => onTextColor(e.target.value)}
                    />
                </div>
            </div>
        );
    };

export const LinkEditorExample: React.FC = ({ data, setText, handlesubmitComment }: any) => {
    const defaultData = {
        blocks: [
          
        ],
        entityMap: {
            
        },
    };
    let _idVal = localStorage.getItem('_id')
    let { user_id, email,aud }: any = TokenInfo();
    const { token }: any = getToken(); // Extracting token to use in the API call
    const [contentHistory, setContentHistory] = useState<any>([])
    const { data: EditorData, loading, refetch: ReFatchApi }: any = useApiFetch<any>(`legal/documents-by-id/${data?.doc_id}`, token);
    const { result: PutApiResponse, loading: PutApiLoading, sendPostRequest: updateData }: any = usePutApi(`legal/document/${data?.doc_id}`)
    const [commentList, setCommentList] = useState<any>([]); // State variable for managing comment list. Initally, comment list will be empty on component mount
    const [modal, setModal] = useState<any>(false) // State variable for managing opening and closing of modal. Initially, the modal will be closed on component mount

    /* The following code is creating a decorator for a text editor in a TypeScript React application. The
    decorator is used to apply different styles or components to specific portions of the text. In
    this case, the decorator is using a strategy called `findLinkEntities` to find link entities in
    the text and apply the `Link` component to those entities. */
    const decorator = new CompositeDecorator([
        {
            strategy: findLinkEntities,
            component: (props:any) => <Link {...props} modal={modal} setModal={setModal} />,
        },
    ]);
    const initialContentState = convertFromRaw(defaultData);

    /* The following code is declaring a variable `editorRef` using the `useRef` hook in TypeScript with a
    generic type `Editor | null`. It initializes the value of `editorRef` to `null`. */
    const editorRef = useRef<Editor | null>(null);

    const [editorState, setEditorState] = useState(() => {
        return EditorState.createWithContent(initialContentState, decorator);
    });
    
    const [showURLInput, setShowURLInput] = useState(false);
    const [urlValue, setURLValue] = useState("");
    const [textSize, setTextSize] = useState(16);
    const [fontFamily, setFontFamily] = useState("Arial, sans-serif");
    const [textColor, setTextColor] = useState("black");
    const [textColorSelected, setTextColorSelected] = useState("black");
    const [open, setOpen] = useState<any>(false)
    const { result: postNegotiationResponse, sendPostRequest: postNegotiation } = usePostApi(`legal/document-negotiation`);
 
    /**
     * The `focusEditor` function focuses on the editor element if it exists.
     */
    const focusEditor = () => {
        if (editorRef.current) {
            editorRef.current.focus();
        }
    };

    /**
     * The function onChange updates the editor state with a new editor state value.
     * @param {EditorState} newEditorState - The newEditorState parameter is of type EditorState. It
     * represents the updated state of an editor component.
     */
    const onChange = (newEditorState: EditorState) => {

        setEditorState(newEditorState);
    };

    const logState = () => {
        const content = editorState.getCurrentContent();
    };

    /**
     * The function `onURLChange` updates the state variables `URLValue` and `Text` with the value of
     * an input element when its value changes.
     * @param e - The parameter `e` is of type `React.ChangeEvent<HTMLInputElement>`. This means it is
     * an event object that is triggered when the value of an input element of type `HTMLInputElement`
     * changes.
     */
    const onURLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setURLValue(e.target.value);
        setText(e.target.value)
    };

    /**
     * The function `promptForLink` checks if there is a selected text in the editor and if so, it
     * shows an input field for the user to enter a URL.
     */
    const promptForLink = () => {
        const selection = editorState.getSelection();
        if (!selection.isCollapsed()) {
            setShowURLInput(true);
            setURLValue("");
            setTimeout(focusEditor, 0);
        }
    };

    /**
     * The `confirmLink` function creates a link entity in the editor state, toggles the link on the
     * selected text, updates the editor state, hides the URL input, clears the URL value, focuses on
     * the editor, and submits the updated editor state.
     */
    const confirmLink = () => {
        const contentState = editorState.getCurrentContent();

        const contentStateWithEntity = contentState.createEntity(
            "LINK",
            "MUTABLE",
            { url: urlValue, user: email }
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

        let nextEditorState = EditorState.set(editorState, {
            currentContent: contentStateWithEntity,
        });

        nextEditorState = RichUtils.toggleLink(
            nextEditorState,
            nextEditorState.getSelection(),
            entityKey
        );

        setEditorState(nextEditorState);
        setShowURLInput(false);
        setURLValue("");
        setTimeout(focusEditor, 0);
       
      
        handleSubmit(nextEditorState)
        if(localStorage.getItem('user_type')==='Customer'){
            const body:any={
                asset_id:localStorage.getItem('assets_list_id'),
                asset_owner:aud,
                doc_id:data?.doc_id
            }
            setTimeout(()=>{
                postNegotiation(body)

            },2000)
        }else{
            const body:any={
                asset_id:id,
                asset_owner:data?.asset_owner,
                doc_id:data?.doc_id
            }
            setTimeout(()=>{
                postNegotiation(body)

            },2000)

        }
    };

    /**
     * The function `handleSubscriptClick` toggles the 'SUBSCRIPT' inline style on the selected text or
     * the text that will be typed afterward in a TypeScript React editor.
     */
    const handleSubscriptClick = () => {
        // Get the current editor state
        const currentEditorState = editorState;

        // Check if the current selection has the 'SUBSCRIPT' inline style applied
        const selection = currentEditorState.getSelection();
        const currentStyle = currentEditorState.getCurrentInlineStyle();
        const hasSubscript = currentStyle.has('SUBSCRIPT');

        // Define the new inline style to apply or remove
        const newStyle = hasSubscript ? currentStyle.remove('SUBSCRIPT') : currentStyle.add('SUBSCRIPT');

        // Apply the new inline style to the selected text or the text that will be typed afterward
        const newEditorState = RichUtils.toggleInlineStyle(currentEditorState, 'SUBSCRIPT');

        // Update the editor state with the new state
        setEditorState(EditorState.setInlineStyleOverride(newEditorState, newStyle));
    };

    /**
     * The function `handleSuperscriptClick` toggles the superscript inline style on the selected text
     * or the text that will be typed afterward in a TypeScript React editor.
     */
    const handleSuperscriptClick = () => {
        // Get the current editor state
        const currentEditorState = editorState;

        // Check if the current selection has the 'SUBSCRIPT' inline style applied
        const selection = currentEditorState.getSelection();
        const currentStyle = currentEditorState.getCurrentInlineStyle();
        const hasSupscript = currentStyle.has('SUPERSCRIPT');

        // Define the new inline style to apply or remove
        const newStyle = hasSupscript ? currentStyle.remove('SUPERSCRIPT') : currentStyle.add('SUPERSCRIPT');

        // Apply the new inline style to the selected text or the text that will be typed afterward
        const newEditorState = RichUtils.toggleInlineStyle(currentEditorState, 'SUPERSCRIPT');

        // Update the editor state with the new state
        setEditorState(EditorState.setInlineStyleOverride(newEditorState, newStyle));
    }

    /**
     * The function `handleHighlightClick` toggles the inline style "HIGHLIGHT" in the editor state.
     * @param {any} color - The color parameter is the color value that you want to apply to the
     * highlighted text. It can be any valid CSS color value, such as "red", "#FF0000", or "rgb(255, 0,
     * 0)".
     */
    const handleHighlightClick = (color: any) => {
        // Get the current editor state
        // HIGHLIGHT
        setEditorState(RichUtils.toggleInlineStyle(editorState, "HIGHLIGHT"));
        // const currentEditorState = editorState;

        // // Toggle the custom inline style for text highlight color
        // const newEditorState = RichUtils.toggleInlineStyle(
        //   currentEditorState,
        //   INLINE_STYLES.HIGHLIGHT_COLOR,
        //   color
        // );

        // // Update the editor state with the new state
        // setEditorState(newEditorState);
    };

    /**
     * The function `handleStrikethroughClick` toggles the 'STRIKETHROUGH' inline style in a React
     * TypeScript editor.
     */
    const handleStrikethroughClick = () => {
        // Get the current editor state
        const currentEditorState = editorState;

        // Toggle the 'STRIKETHROUGH' inline style
        const newEditorState = RichUtils.toggleInlineStyle(
            currentEditorState,
            'STRIKETHROUGH'
        );

        // Update the editor state with the new state
        setEditorState(newEditorState);
    };

    /**
     * The function `handleMonospaceClick` toggles the 'CODE' inline style in the editor state.
     */
    const handleMonospaceClick = () => {
        // Get the current editor state
        const currentEditorState = editorState;

        // Toggle the 'CODE' inline style
        const newEditorState = RichUtils.toggleInlineStyle(
            currentEditorState,
            'CODE'
        );

        // Update the editor state with the new state
        setEditorState(newEditorState);
    };

    /**
     * The function `handleBlockquoteClick` toggles the blockquote block type in a React editor.
     */
    const handleBlockquoteClick = () => {
        // Get the current editor state
        const currentEditorState = editorState;

        // Toggle the 'blockquote' block type
        const newEditorState = RichUtils.toggleBlockType(
            currentEditorState,
            'blockQuote'
        );

        // Update the editor state with the new state
        setEditorState(newEditorState);
    };

    /**
     * The function `handleUnorderedListClick` toggles the block type of the editor state between
     * 'unordered-list-item' and the current block type.
     */
    const handleUnorderedListClick = () => {
        // Get the current editor state
        const currentEditorState = editorState;

        // Toggle the 'unordered-list-item' block type
        const newEditorState = RichUtils.toggleBlockType(
            currentEditorState,
            'unordered-list-item'
        );

        // Update the editor state with the new state
        setEditorState(newEditorState);
    };

    /**
     * The function `handleOrderedListClick` toggles the block type of the editor state between
     * 'ordered-list-item' and the current block type.
     */
    const handleOrderedListClick = () => {
        // Get the current editor state
        const currentEditorState = editorState;

        // Toggle the 'ordered-list-item' block type
        const newEditorState = RichUtils.toggleBlockType(
            currentEditorState,
            'ordered-list-item'
        );

        // Update the editor state with the new state
        setEditorState(newEditorState);
    };

    /**
     * The function `handleUppercaseClick` toggles the 'UPPERCASE' inline style in a React editor.
     */
    const handleUppercaseClick = () => {
        // Get the current editor state
        const currentEditorState = editorState;

        // Toggle the 'UPPERCASE' inline style
        const newEditorState = RichUtils.toggleInlineStyle(
            currentEditorState,
            'UPPERCASE'
        );

        // Update the editor state with the new state
        setEditorState(newEditorState);
    };


    /**
     * The function `handleLowercaseClick` toggles the 'LOWERCASE' inline style in a React editor.
     */
    const handleLowercaseClick = () => {
        // Get the current editor state
        const currentEditorState = editorState;

        // Toggle the 'LOWERCASE' inline style
        const newEditorState = RichUtils.toggleInlineStyle(
            currentEditorState,
            'LOWERCASE'
        );

        // Update the editor state with the new state
        setEditorState(newEditorState);
    };

    /**
     * The function `handleHeadingClick` is used to toggle the font size of the selected text based on
     * the heading level.
     * @param {any} level - The `level` parameter represents the heading level that is clicked. It can
     * be any number from 1 to 6, where 1 represents the highest level heading (H1) and 6 represents
     * the lowest level heading (H6).
     */
    const handleHeadingClick = (level: any) => {
        // Get the current editor state
        const currentEditorState = editorState;

        // Define the new block type based on the heading level
        let newBlockType;
        switch (level) {
            case 1:
                setEditorState(RichUtils.toggleInlineStyle(editorState, "FONT_SIZE_H1"));
                // newBlockType = BLOCK_TYPES.HEADER_ONE;
                break;
            case 2:
                setEditorState(RichUtils.toggleInlineStyle(editorState, "FONT_SIZE_H2"));
                break;
            case 3:
                setEditorState(RichUtils.toggleInlineStyle(editorState, "FONT_SIZE_H3"));
                break;
            case 4:
                setEditorState(RichUtils.toggleInlineStyle(editorState, "FONT_SIZE_H4"));
                break;
            case 5:
                setEditorState(RichUtils.toggleInlineStyle(editorState, "FONT_SIZE_H5"));
                break;
            case 6:
                setEditorState(RichUtils.toggleInlineStyle(editorState, "FONT_SIZE_H6"));
                break;
            default:
                newBlockType = BLOCK_TYPES.UNSTYLED; // Or the default block type you want to use
                break;
        }


    };




    /**
     * The function `onLinkInputKeyDown` triggers the `confirmLink` function when the enter key is
     * pressed.
     * @param e - The parameter `e` is of type `React.KeyboardEvent<HTMLInputElement>`. It represents
     * the keyboard event that occurred.
     */
    const onLinkInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.which === 13) {
            confirmLink();
        }
    };

    /**
     * The `removeLink` function is used to remove a link from the selected text in a React editor.
     * @param e - React.MouseEvent<HTMLButtonElement, MouseEvent> - This is the event object that is
     * passed when the button is clicked. It contains information about the event, such as the target
     * element and the type of event (in this case, a mouse click).
     */
    const removeLink = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const selection = editorState.getSelection();
        if (!selection.isCollapsed()) {
            const nextEditorState = RichUtils.toggleLink(
                editorState,
                selection,
                null
            );
            setEditorState(nextEditorState);
        }
    };

    /**
     * The function `handleBoldClick` toggles the "BOLD" inline style in the editor state.
     */
    const handleBoldClick = () => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
    };

    /**
     * The function `handleItalicClick` toggles the "ITALIC" inline style in the editor state.
     */
    const handleItalicClick = () => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
    };

    /**
     * The function `handleUnderlineClick` toggles the "UNDERLINE" inline style in the editor state.
     */
    const handleUnderlineClick = () => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
    };

    /**
     * The `handleTextAlign` function takes an alignment option as input and applies the corresponding
     * block style to the selected text in the editor.
     * @param {any} alignment - The `alignment` parameter is a string that represents the desired text
     * alignment. It can have one of the following values: 'left', 'center', 'right', or 'justify'.
     * @returns The function does not explicitly return anything.
     */
    const handleTextAlign = (alignment: any) => {
        // Determine the block style based on the alignment option
        let blockStyle: any = null;
        switch (alignment) {
            case 'left':
                blockStyle = BLOCK_STYLES.TEXT_ALIGN_LEFT;
                break;
            case 'center':
                blockStyle = BLOCK_STYLES.TEXT_ALIGN_CENTER;
                break;
            case 'right':
                blockStyle = BLOCK_STYLES.TEXT_ALIGN_RIGHT;
                break;
            case 'justify':
                blockStyle = BLOCK_STYLES.TEXT_ALIGN_JUSTIFY;
                break;
            default:
                break;
        }

        if (!blockStyle) {
            return;
        }

        // Get the current editor state
        const currentEditorState = editorState;

        // Toggle the custom block style for text alignment
        const contentState = currentEditorState.getCurrentContent();
        const selection = currentEditorState.getSelection();
        const blockMap = contentState.getBlockMap();

        // Iterate through each block in the selection and apply the block style
        let newContentState = contentState;
        blockMap.forEach((block: any) => {
            if (block.getKey() === selection.getStartKey()) {
                newContentState = Modifier.setBlockType(
                    newContentState,
                    selection,
                    blockStyle
                );
            }
        });



        // Update the editor state with the new content state
        const newEditorState = EditorState.push(
            currentEditorState,
            newContentState,
            'change-block-data'
        );

        setEditorState(newEditorState);
    };


    /**
     * The function `handleTextColor` is used to toggle the text color of the editor state in a
     * TypeScript React application.
     * @param {any} color - The `color` parameter is the color value that you want to apply to the
     * text. It can be any valid CSS color value, such as a color name (e.g., "red"), a hexadecimal
     * color code (e.g., "#ff0000"), or an RGB value (e.g.,
     */
    const handleTextColor = (color: any) => {
        setTextColorSelected(color);
        setEditorState(RichUtils.toggleInlineStyle(editorState, "TEXTCOLOR"));
    };

    const contentState = editorState.getCurrentContent();
    const raw = convertToRaw(contentState);
    //   const rawStr = jsonBeautify(raw, null, 2, 50);
    const location: any = useLocation();
    const { id }: any = useParams() // Extracting the endpoint which contains asset id for defining the payload for API call
    const AssetsId: any = location?.state;

    /**
     * The `handleSubmit` function is used to handle the submission of a form in a TypeScript React
     * application, updating the content history and sending the updated data to be saved.
     * @param {any} nextEditorState - The `nextEditorState` parameter is the updated state of the
     * editor after the user has made changes. It represents the new content and formatting of the
     * editor.
     */
    const handleSubmit = (nextEditorState: any) => {
        // handlesubmitComment()
        let date = new Date();
        const contentState: any = nextEditorState.getCurrentContent() || editorState.getCurrentContent();

        setContentHistory([...contentHistory, {
            author: EditorData?.data?.author,
            content: JSON.stringify(convertToRaw(contentState)),
            docUpdatedAt: date
        }])
    
if(localStorage.getItem('user_type')==='Customer'){
    const body: any = {
        title: EditorData?.data?.title,
        userId: EditorData?.data?.author?.user_id?.toString() || user_id?.toString(),
        contentHistory: [...contentHistory, {
            author: EditorData?.data?.author,
            content: JSON.stringify(convertToRaw(contentState)),
            docUpdatedAt: date
        }],
        commentList: commentList,
        collaborators: EditorData?.data?.collaborators || [],
        content: JSON.stringify(convertToRaw(contentState)),
        password: EditorData?.data?.password,
        asset_id:localStorage.getItem('assets_list_id')
    };
    updateData(body);
}else{
    const body: any = {
        title: EditorData?.data?.title,
        userId: EditorData?.data?.author?.user_id?.toString() || user_id?.toString(),
        contentHistory: [...contentHistory, {
            author: EditorData?.data?.author,
            content: JSON.stringify(convertToRaw(contentState)),
            docUpdatedAt: date
        }],
        commentList: commentList,
        collaborators: EditorData?.data?.collaborators || [],
        content: JSON.stringify(convertToRaw(contentState)),
        password: EditorData?.data?.password,
        asset_id: id
    };
    updateData(body);

}

    }

    /* The following code is using the useEffect hook in a TypeScript React component. It is calling the
    ReFatchApi function when the component mounts, as indicated by the empty dependency array passed
    as the second argument to useEffect. */
    useEffect(() => {
        ReFatchApi()

    }, [])

    /* The following code is a useEffect hook in a TypeScript React component. It is triggered whenever the
    value of `EditorData?.data` changes. */
    useEffect(() => {

        if (EditorData?.data?.content && EditorData?.data?.content.length > 20) {

            setContentHistory(EditorData?.data?.contentHistory);
            let newData: any = EditorState.createWithContent(
                convertFromRaw(JSON.parse(EditorData?.data?.content)), decorator)
            setCommentList(EditorData?.data?.commentList || [])
            setEditorState(newData)
        }
    }, [EditorData?.data])


    /* The following code is using the useEffect hook in a React component. It is checking the value of the
    variable `PutApiResponse` and performing different actions based on its value. */
    useEffect(() => {
        if (PutApiResponse?.statusCode === 200 || PutApiResponse?.data?.content) {
            let obj: any = {
                message: "Data save Successfully !",
                status: 200,
            }
            messageViewNew(obj);

        } else if (PutApiResponse?.statusCode === 400 || PutApiResponse?.statusCode === 409 || PutApiResponse?.status === 413) {
            let obj: any = {
                message: PutApiResponse?.message || "Some error occurred !",
                status: 401,
            }
            messageViewNew(obj);
        }
    }, [PutApiResponse])

    const handledownload = () => {
        // Get the content you want to print
        const printContents: any = document.getElementById("editor").innerHTML;
        const rawContent = convertToRaw(editorState.getCurrentContent());
        const stateToPdfMake = new StateToPdfMake(rawContent);
        // Capture the element as an image
        const pdfWidth = 210;
        const pdfHeight = 297;
        const elementToCapture: any = document.getElementById("editor");
        html2canvas(elementToCapture, { scale: 0.8 }).then((canvas) => { // Adjust scale as needed
            // Convert the captured image to a data URL (base64-encoded string)
            const dataURL = canvas.toDataURL('image/png');

            // Calculate the aspect ratio of the image
            const img = new Image();
            img.src = dataURL;
            const imgAspectRatio = img.width / img.height;

            // Calculate the dimensions to fit the image within A4
            let imgWidth = pdfWidth; // Set width to A4 width
            let imgHeight = pdfWidth / imgAspectRatio; // Calculate height to maintain aspect ratio

            // Check if the calculated height exceeds the A4 height
            if (imgHeight > pdfHeight) {
                imgHeight = pdfHeight; // Set height to A4 height
                imgWidth = pdfHeight * imgAspectRatio || 297; // Recalculate width to maintain aspect ratio
            }

            // Create a PDF document with A4 dimensions
            const pdf = new jsPDF({
                unit: 'mm',
                format: [pdfWidth, pdfHeight], // Set A4 dimensions
            });

            // Calculate the centering position
            const xOffset = (pdfWidth - imgWidth) / 2;
            const yOffset = (pdfHeight - imgHeight) / 2 || 0;

            // Add the captured image to the PDF with calculated dimensions and centering
            pdf.addImage(dataURL, 'PNG', 10, 10);


            // Save or display the PDF document
            pdf.save('your-pdf-filename.pdf');
        });
        // pdfMake.createPdf(stateToPdfMake.generate()).download();
        const pdfDoc = pdfMake.createPdf(stateToPdfMake.generate());
        pdfDoc.getBlob((blob: any) => {
            // Now you have the Blob data, you can do whatever you want with it
            // For example, you can create a Blob URL to display or download the PDF
            const blobUrl = URL.createObjectURL(blob);
        });
        pdfDoc.getBase64((base64: any) => {
            // Now you have the base64-encoded data, you can do whatever you want with it
            // For example, you can use it to display the PDF in an iframe or to download the PDF
            const obj: any = {
                editorContent: rawContent,
                base64: base64,
                stateToPdfMake: stateToPdfMake

            }
        });

    };

    /**
     * The function `myBlockRenderer` returns an object with properties `component`, `editable`, and
     * `props` based on the type of the content block.
     * @param {any} contentBlock - The `contentBlock` parameter is an object that represents a block of
     * content in a text editor. It contains information about the type of block, its text content, and
     * any associated metadata. In this code snippet, the `contentBlock` parameter is used to determine
     * the type of the block.
     * @returns The code is returning an object with the properties `editable` set to `false`.
     */
    function myBlockRenderer(contentBlock: any) {
        const type = contentBlock.getType();
        if (type) {
            return {
                // component: MediaComponent,
                editable: false,
                // props: {
                //   foo: 'bar',
                // },
            };
        }
    }

    useEffect(()=>{
        if(postNegotiationResponse){
            messageViewNew(postNegotiationResponse)
        }

    },[postNegotiationResponse?.message])
    /* The following code is a TypeScript React component that renders a text editor with various
    formatting options. It uses the `Editor` component from the `draft-js` library to provide rich
    text editing capabilities. The component includes a toolbar with buttons for bold, italic,
    underline, text alignment, text color, subscript, superscript, highlight, strikethrough,
    monospace, blockquote, unordered list, ordered list, uppercase, lowercase, and heading styles.
    It also includes buttons for adding and removing links. The editor supports custom block styles
    and custom inline styles. The component also includes a modal for displaying */
    return (
        <div className="w-full h-full">
            <ToastContainer />
            {/* <UploadModal open={open} setOpen={setOpen} /> */}
            {/* <TemporaryDrawer AssetsId={AssetsId} setEditorState={setEditorState} EditorState={EditorState} convertFromRaw={convertFromRaw} /> */}



            {false && <div style={styles.toolbar}>
                <Toolbar
                    onBoldClick={handleBoldClick}
                    onItalicClick={handleItalicClick}
                    onUnderlineClick={handleUnderlineClick}
                    onTextAlign={handleTextAlign}
                    onTextColor={handleTextColor}
                    promptForLink={promptForLink}
                    linkInputVisible={showURLInput}
                    linkUrl={urlValue}
                    setLinkUrl={setURLValue}
                    confirmLink={confirmLink}
                    onSubscriptClick={handleSubscriptClick}
                    onSuperscriptClick={handleSuperscriptClick}
                    onHighlightClick={handleHighlightClick}
                    onStrikethroughClick={handleStrikethroughClick}
                    onMonospaceClick={handleMonospaceClick}
                    onBlockquoteClick={handleBlockquoteClick}
                    onUnorderedListClick={handleUnorderedListClick}
                    onOrderedListClick={handleOrderedListClick}
                    //   onCodeBlockClick={handleCodeBlockClick}
                    onUppercaseClick={handleUppercaseClick}
                    onLowercaseClick={handleLowercaseClick}
                    onHeadingClick={handleHeadingClick}
                />
            </div>
            }
            <div style={styles.buttons}>
                <button onMouseDown={promptForLink} style={{ marginRight: 10 }}>
                    <AddCommentIcon />
                </button>
                <button onMouseDown={removeLink}><CommentsDisabledIcon /></button>
            </div>
            {showURLInput && (

                <div style={styles.urlInputContainer}>
                    <input
                        onChange={onURLChange}
                        ref={editorRef}
                        style={styles.urlInput}
                        type="text"
                        value={urlValue}
                        onKeyDown={onLinkInputKeyDown}
                    />
                    <button onMouseDown={confirmLink}><CheckIcon /></button>
                </div>
            )}
            <ChatModal modal={modal} convertToRaw={convertToRaw} EditorData={EditorData} editorState={editorState} contentHistory={contentHistory} user={EditorData?.data?.author?.user_id?.toString() || user_id?.toString()} setModal={setModal} url={url1} setCommentList={setCommentList} commentList={commentList} data={data} />

            <div id="editor" className="bg-white !min-h-[400px]"
                style={{
                    ...styles.editor,
                    fontSize: `${textSize}px`,
                    fontFamily: fontFamily,
                    color: textColor,
                }}
                onClick={focusEditor}
            >
                <Editor

                    editorState={editorState}

                    onChange={onChange}
                    placeholder="Enter some text..."
                    blockStyleFn={(contentBlock: any) => {
                        const type = contentBlock.getType();
                        const alignment = contentBlock.getData() // Assuming you store alignment data in the block data
                        console.log("alignment", alignment?.alignment, type);

                        if (type === 'blockQuote') {
                            return 'custom-blockquote'; // CSS class for blockquote
                        }
                        if (type === 'unordered-list-item') {
                            return 'custom-unordered-list'; // CSS class for unordered list
                        }
                        if (type === 'ordered-list-item') {
                            return 'custom-ordered-list'; // CSS class for ordered list
                        }

                        if (type === 'text-align-left') {
                            return 'text-align-left';
                        }
                        if (type === 'text-align-right') {
                            return 'text-align-right';
                        }
                        if (type === 'text-align-center') {
                            return 'text-align-center';
                        }
                        if (type === 'text-align-justify') {
                            return 'text-align-justify';
                        }

                        return null; // Default case
                    }}
                    blockRendererFn={myBlockRenderer}


                    customStyleMap={{
                        [INLINE_STYLES.TEXT_COLOR]: {
                            color: (style: any) => style.substring(11), // Extract the color value
                        },
                        [INLINE_STYLES.HIGHLIGHT_COLOR]: {
                            backgroundColor: (style: any) => style.substring(15), // Extract the color value
                        },
                        UPPERCASE: INLINE_STYLES.UPPERCASE,
                        LOWERCASE: INLINE_STYLES.LOWERCASE,
                        TEXTCOLOR: {
                            color: `${textColorSelected}`
                        },
                        SUBSCRIPT: {
                            verticalAlign: 'sub',
                            fontSize: '80%',
                        },
                        FONT_SIZE_H1: {
                            fontSize: '36px', // Adjust the font size as needed
                            fontWeight: 'bold', // Adjust the font weight as needed
                        },
                        FONT_SIZE_H2: {
                            fontSize: '30px',
                            fontWeight: 'bold',
                        },
                        FONT_SIZE_H3: {
                            fontSize: '24px',
                            fontWeight: 'bold',
                        },
                        FONT_SIZE_H4: {
                            fontSize: '20px',
                            fontWeight: 'bold',
                        },
                        FONT_SIZE_H5: {
                            fontSize: '18px',
                            fontWeight: 'bold',
                        },
                        FONT_SIZE_H6: {
                            fontSize: '16px',
                            fontWeight: 'bold',
                        },
                        HIGHLIGHT: {
                            background: "yellow",
                        },
                        SUPERSCRIPT: {
                            verticalAlign: 'super',
                            fontSize: 'smaller',
                        },
                        STRIKETHROUGH: {
                            textDecoration: 'line-through',
                        },
                        CODE: {
                            fontFamily: 'monospace',
                            backgroundColor: '#f0f0f0',
                            padding: '2px 4px',
                            borderRadius: '4px',
                        },

                    }}
                    ref={editorRef}
                />
            </div>
            {false && <div className="flex justify-end mt-4">
                <Button className='indigo-btn !bg-[#FFB017] !text-white' onClick={handleSubmit}>submit</Button>
            </div>}
            {/* <pre>
        <code>{rawStr}</code>
      </pre> */}
        </div>
    );
};

/* The following code is defining a JavaScript object called `styles` which contains various CSS styles as
properties. These styles are used for styling a React component in a TypeScript project. The
`styles` object includes styles for the root element, buttons, URL input container, URL input,
editor, button, link, and toolbar. These styles define properties such as font family, padding,
width, margin, border, cursor, color, and text decoration. */
const styles = {
    root: {
        fontFamily: "'Georgia', serif",
        padding: 20,
        width: 400,
    },
    buttons: {
        marginBottom: 10,
    },
    urlInputContainer: {
        marginBottom: 10,
    },
    urlInput: {
        fontFamily: "'Georgia', serif",
        marginRight: 10,
        padding: 3,
    },
    editor: {
        border: "1px solid #ccc",
        cursor: "text",
        minHeight: 80,
        padding: 10,
    },
    button: {
        marginTop: 10,
        textAlign: "center",
    },
    link: {
        color: "#3b5998",
        textDecoration: "underline",
    },
    toolbar: {
        marginBottom: 10,
    },
};

export default LinkEditorExample;
