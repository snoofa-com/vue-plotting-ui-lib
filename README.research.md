# Research Report: UI Component for Plotting

## Introduction

Conducted a short research on how to implement the Plotting UI component as per the given requirements. Looked into many popular open source libraries used for image manipulation, editing, prototyping, etc.

## Findings

1. **Open Source Libraries:**
   Examined libraries fell into three categories: overly complex, outdated, or lacking in key functionalities. No library fully met our use case requirements.
   These are some of the libraries that was looked into:

   1. [tui.image-editor](https://github.com/nhn/tui.image-editor)
   2. [filerobot-image-editor](https://github.com/scaleflex/filerobot-image-editor)
   3. [plasmic](https://github.com/plasmicapp/plasmic)
   4. [react-imgpro](https://github.com/nitin42/react-imgpro)
   5. [react-photo-editor](https://github.com/musama619/react-photo-editor)
   6. [jimp](https://github.com/jimp-dev/jimp)

2. **Building from Scratch:**
   After evaluating open-source libraries, it was concluded that constructing the UI component from scratch is preferred. Existing libraries lacked specific features crucial for our use case.

3. **A Promising Starting Point:**
   A React-based repo was identified as a promising starting point for our project. [react-image-editor](https://github.com/swimmingkiim/react-image-editor) is an Figma/Canva image canvas editor but it fully based on React and the codebase is mostly easy to understand.

## Conclusion

The research supports the decision to build the UI component from scratch, addressing the shortcomings in existing libraries. Leveraging a React-based library provides a solid foundation for developing a tailored component that meets specific project requirements.
