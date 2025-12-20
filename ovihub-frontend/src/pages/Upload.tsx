import FileUpload03 from "@/components/file-upload-03";


const Upload = () => {
   //FIXME: Nu merge drag and drop, merge doar cu select files click, si mai e un bug uneori
   //      cand dau cancel mi se redeschide fereastra din nou pt selectare fisiere
   
   return (
      <>
         <div>
            <FileUpload03>
            </FileUpload03>
         </div>
      </>
   );
}

export default Upload;