import React, { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import Quill from 'quill';

// Editor is an uncontrolled React component
const Editor = forwardRef(({ onTextChange, className, readOnly, theme, defaultValue }, ref) => {
    const containerRef = useRef(null)
    const defaultValueRef = useRef(defaultValue)
    const onTextChangeRef = useRef(onTextChange)
    useLayoutEffect(() => {
        onTextChangeRef.current = onTextChange
    })
    useEffect(() => {
        const container = containerRef.current;
        const editorContainer = container.appendChild(
            container.ownerDocument.createElement('div'),
        );

        const quill = new Quill(editorContainer, {
            placeholder: readOnly ? '' : 'Tell Your Story',
            readOnly: readOnly,
            theme: theme ? theme : 'snow',
            modules: {
                toolbar: [
                    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                    ['bold', 'italic', 'underline'],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                    [{ 'align': [] }],
                ]
            },
            formats: [
                'header', 'font',
                'bold', 'italic', 'underline',
                'list', 'align'
            ],
        });

        ref.current = quill;

        if (defaultValueRef.current) {
            quill.setContents(defaultValueRef.current);
          }
        quill.on(Quill.events.TEXT_CHANGE, () => {
            const data = quill.getContents().ops;
            onTextChangeRef.current?.(data);
        });

        return () => {
            ref.current = null;
            container.innerHTML = '';
        };
    }, [ref]);

    return <div ref={containerRef} className={className}></div>;
},
);
export default Editor;