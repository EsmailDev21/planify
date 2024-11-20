import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  PiFileTextDuotone,
  PiFileImageDuotone,
  PiFilePdfDuotone,
  PiFileVideoDuotone,
  PiFileAudioDuotone,
  PiFileCodeDuotone,
  PiFileCssDuotone,
  PiFileCsvDuotone,
  PiFileDocDuotone,
  PiFileDuotone,
  PiFileHtmlDuotone,
  PiFileJpgDuotone,
  PiFileJsDuotone,
  PiFileJsxDuotone,
  PiFilePngDuotone,
  PiFilePptDuotone,
  PiFileTsDuotone,
  PiFileTsxDuotone,
  PiFileXDuotone,
  PiFileXlsDuotone,
  PiFileZipDuotone,
} from "react-icons/pi"; // Add necessary icon imports
import Image from "next/image";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface FileViewerProps {
  file: {
    name: string;
    size: number;
    extension: string;
    previewUrl: string; // This could be a URL for previewable files
    content: string; // Content for code files (could be a string with code)
  };
}

const getFileIcon = (extension: string) => {
  const getClassNames = (baseColor: string) => cn(`h-16 w-16 ${baseColor}`);

  switch (extension) {
    case "txt":
      return <PiFileTextDuotone className={getClassNames("text-green-500")} />;
    case "js":
      return <PiFileJsDuotone className={getClassNames("text-yellow-500")} />;
    case "jsx":
      return <PiFileJsxDuotone className={getClassNames("text-yellow-500")} />;
    case "html":
      return <PiFileHtmlDuotone className={getClassNames("text-orange-500")} />;
    case "css":
      return <PiFileCssDuotone className={getClassNames("text-blue-500")} />;
    case "pdf":
      return <PiFilePdfDuotone className={getClassNames("text-red-500")} />;
    case "jpg":
    case "jpeg":
      return <PiFileJpgDuotone className={getClassNames("text-purple-500")} />;
    case "png":
      return <PiFilePngDuotone className={getClassNames("text-purple-500")} />;
    case "gif":
    case "bmp":
    case "svg":
      return (
        <PiFileImageDuotone className={getClassNames("text-purple-500")} />
      );
    case "json":
    case "xml":
      return <PiFileCodeDuotone className={getClassNames("text-cyan-500")} />;
    case "mp4":
    case "avi":
    case "mov":
    case "mkv":
      return <PiFileVideoDuotone className={getClassNames("text-teal-500")} />;
    case "mp3":
    case "wav":
    case "aac":
      return (
        <PiFileAudioDuotone className={getClassNames("text-indigo-500")} />
      );
    case "zip":
    case "rar":
    case "7z":
      return <PiFileZipDuotone className={getClassNames("text-gray-500")} />;
    case "doc":
    case "docx":
      return <PiFileDocDuotone className={getClassNames("text-blue-600")} />;
    case "xls":
      return <PiFileXDuotone className={getClassNames("text-green-600")} />;
    case "xlsx":
      return <PiFileXlsDuotone className={getClassNames("text-green-600")} />;
    case "ppt":
    case "pptx":
      return <PiFilePptDuotone className={getClassNames("text-red-600")} />;
    case "ts":
      return <PiFileTsDuotone className={getClassNames("text-blue-600")} />;
    case "tsx":
      return <PiFileTsxDuotone className={getClassNames("text-blue-600")} />;
    case "csv":
      return <PiFileCsvDuotone className={getClassNames("text-emerald-600")} />;
    default:
      return <PiFileDuotone className={getClassNames("text-gray-500")} />;
  }
};

const FileViewer: React.FC<FileViewerProps> = ({ file }) => {
  const { name, size, extension, previewUrl, content } = file;

  const formattedSize =
    size < 1024 ? `${size} KB` : `${(size / 1024).toFixed(2)} MB`;

  return (
    <div className="flex flex-col items-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            {getFileIcon(file.extension)}
            <span>{name}</span>
          </CardTitle>
          <CardDescription>{formattedSize}</CardDescription>
        </CardHeader>
        <CardContent>
          {extension === "jpg" ||
          extension === "jpeg" ||
          extension === "png" ? (
            <Image
              height={700}
              width={1000}
              src={previewUrl}
              alt="File preview"
              className="w-full h-auto rounded-lg"
            />
          ) : extension === "pdf" ? (
            <iframe
              src={previewUrl}
              className="w-full h-64 rounded-lg"
              title="PDF Preview"
            />
          ) : extension === "mp4" || extension === "mov" ? (
            <video controls className="w-full h-auto rounded-lg">
              <source src={previewUrl} type={`video/${extension}`} />
              Your browser does not support the video tag.
            </video>
          ) : extension === "mp3" || extension === "wav" ? (
            <audio controls className="w-full">
              <source src={previewUrl} type={`audio/${extension}`} />
              Your browser does not support the audio element.
            </audio>
          ) : extension === "js" ||
            extension === "jsx" ||
            extension === "ts" ||
            extension === "tsx" ||
            extension === "html" ||
            extension === "css" ||
            extension === "json" ? (
            <SyntaxHighlighter language={extension} style={docco}>
              {content}
            </SyntaxHighlighter>
          ) : (
            <div className="text-center text-gray-500">
              No preview available
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FileViewer;
