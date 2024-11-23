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
  PiFileCDuotone,
  PiFileCppDuotone,
  PiFileCSharpDuotone,
  PiFileRsDuotone,
  PiFilePyDuotone,
  PiFileSqlDuotone,
  PiDownloadDuotone,
  PiShareDuotone,
  PiPenDuotone,
  PiTrashDuotone,
  PiInfoDuotone,
} from "react-icons/pi"; // Add necessary icon imports
import Image from "next/image";
import {
  docco,
  dracula,
  atomOneDark,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import {
  nightOwl,
  materialLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";

// Import language definitions
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx";
import js from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import ts from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import c from "react-syntax-highlighter/dist/esm/languages/prism/c";
import cpp from "react-syntax-highlighter/dist/esm/languages/prism/cpp";
import csharp from "react-syntax-highlighter/dist/esm/languages/prism/csharp";
import rust from "react-syntax-highlighter/dist/esm/languages/prism/rust";
import python from "react-syntax-highlighter/dist/esm/languages/prism/python";
import xml from "react-syntax-highlighter/dist/esm/languages/prism/xml-doc";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import java from "react-syntax-highlighter/dist/esm/languages/prism/java";
import go from "react-syntax-highlighter/dist/esm/languages/prism/go";
import php from "react-syntax-highlighter/dist/esm/languages/prism/php";
import shell from "react-syntax-highlighter/dist/esm/languages/prism/shell-session";
import yaml from "react-syntax-highlighter/dist/esm/languages/prism/yaml";
import ruby from "react-syntax-highlighter/dist/esm/languages/prism/ruby";
import kotlin from "react-syntax-highlighter/dist/esm/languages/prism/kotlin";
import dart from "react-syntax-highlighter/dist/esm/languages/prism/dart";
import swift from "react-syntax-highlighter/dist/esm/languages/prism/swift";
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash";
import perl from "react-syntax-highlighter/dist/esm/languages/prism/perl";
import scss from "react-syntax-highlighter/dist/esm/languages/prism/scss";
import css from "react-syntax-highlighter/dist/esm/languages/prism/css";
import markdown from "react-syntax-highlighter/dist/esm/languages/prism/markdown";
import sql from "react-syntax-highlighter/dist/esm/languages/prism/sql";
import graphql from "react-syntax-highlighter/dist/esm/languages/prism/graphql";
import objectivec from "react-syntax-highlighter/dist/esm/languages/prism/objectivec";
import powershell from "react-syntax-highlighter/dist/esm/languages/prism/powershell";
import ini from "react-syntax-highlighter/dist/esm/languages/prism/ini";
import apacheconf from "react-syntax-highlighter/dist/esm/languages/prism/apacheconf";
import nginx from "react-syntax-highlighter/dist/esm/languages/prism/nginx";
import docker from "react-syntax-highlighter/dist/esm/languages/prism/docker";
import vim from "react-syntax-highlighter/dist/esm/languages/prism/vim";
import latex from "react-syntax-highlighter/dist/esm/languages/prism/latex";
import r from "react-syntax-highlighter/dist/esm/languages/prism/r";
import matlab from "react-syntax-highlighter/dist/esm/languages/prism/matlab";
import sas from "react-syntax-highlighter/dist/esm/languages/prism/sas";
import assembly from "react-syntax-highlighter/dist/esm/languages/prism/asm6502";
import { useTheme } from "next-themes";
import { textExtensions } from "@/lib/mock/extensions";
import { fileIcons } from "@/lib/mock/fileIcons";
import { DownloadIcon } from "@radix-ui/react-icons";
import { EditIcon, ShareIcon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

// Register languages
SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("js", js);
SyntaxHighlighter.registerLanguage("ts", ts);
SyntaxHighlighter.registerLanguage("c", c);
SyntaxHighlighter.registerLanguage("cpp", cpp);
SyntaxHighlighter.registerLanguage("csharp", csharp);
SyntaxHighlighter.registerLanguage("rust", rust);
SyntaxHighlighter.registerLanguage("python", python);
SyntaxHighlighter.registerLanguage("xml", xml);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("java", java);
SyntaxHighlighter.registerLanguage("go", go);
SyntaxHighlighter.registerLanguage("php", php);
SyntaxHighlighter.registerLanguage("shell", shell);
SyntaxHighlighter.registerLanguage("yaml", yaml);
SyntaxHighlighter.registerLanguage("ruby", ruby);
SyntaxHighlighter.registerLanguage("kotlin", kotlin);
SyntaxHighlighter.registerLanguage("dart", dart);
SyntaxHighlighter.registerLanguage("swift", swift);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("perl", perl);
SyntaxHighlighter.registerLanguage("scss", scss);
SyntaxHighlighter.registerLanguage("css", css);
SyntaxHighlighter.registerLanguage("markdown", markdown);
SyntaxHighlighter.registerLanguage("sql", sql);
SyntaxHighlighter.registerLanguage("graphql", graphql);
SyntaxHighlighter.registerLanguage("objectivec", objectivec);
SyntaxHighlighter.registerLanguage("powershell", powershell);
SyntaxHighlighter.registerLanguage("ini", ini);
SyntaxHighlighter.registerLanguage("apacheconf", apacheconf);
SyntaxHighlighter.registerLanguage("nginx", nginx);
SyntaxHighlighter.registerLanguage("docker", docker);
SyntaxHighlighter.registerLanguage("vim", vim);
SyntaxHighlighter.registerLanguage("latex", latex);
SyntaxHighlighter.registerLanguage("r", r);
SyntaxHighlighter.registerLanguage("matlab", matlab);
SyntaxHighlighter.registerLanguage("sas", sas);
SyntaxHighlighter.registerLanguage("assembly", assembly);
// Use `SyntaxHighlighter` in your components

interface FileViewerProps {
  file: {
    name: string;
    size: number;
    extension: string;
    previewUrl: string | ArrayBuffer | null; // This could be a URL for previewable files
    content: string | ArrayBuffer | null; // Content for code files (could be a string with code)
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
      return <PiFileZipDuotone className={getClassNames("")} />;
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
    case "java":
      return <PiFileCodeDuotone className={getClassNames("text-brown-600")} />;
    case "kotlin":
      return <PiFileCodeDuotone className={getClassNames("text-indigo-400")} />;
    case "swift":
      return <PiFileCodeDuotone className={getClassNames("text-orange-400")} />;
    case "ruby":
      return <PiFileCodeDuotone className={getClassNames("text-red-400")} />;
    case "php":
      return <PiFileCodeDuotone className={getClassNames("text-violet-500")} />;
    case "go":
      return <PiFileCodeDuotone className={getClassNames("text-blue-400")} />;
    case "dart":
      return <PiFileCodeDuotone className={getClassNames("text-cyan-400")} />;
    case "scala":
      return <PiFileSqlDuotone className={getClassNames("text-red-700")} />;
    case "elixir":
      return <PiFileCodeDuotone className={getClassNames("text-purple-700")} />;
    case "clojure":
      return <PiFileCodeDuotone className={getClassNames("text-blue-700")} />;
    case "yaml":
      return <PiFileCodeDuotone className={getClassNames("text-yellow-600")} />;
    case "c":
      return <PiFileCDuotone className={getClassNames("text-blue-500")} />;
    case "cpp":
      return <PiFileCppDuotone className={getClassNames("text-blue-700")} />;
    case "csharp":
      return (
        <PiFileCSharpDuotone className={getClassNames("text-green-500")} />
      );
    case "rust":
      return <PiFileRsDuotone className={getClassNames("text-orange-700")} />;
    case "python":
      return <PiFilePyDuotone className={getClassNames("text-yellow-600")} />;
    case "md":
    case "markdown":
      return <PiFileTextDuotone className={getClassNames("text-blue-400")} />;
    case "log":
      return <PiFileTextDuotone className={getClassNames("text-gray-400")} />;
    case "ini":
    case "env":
      return <PiFileTextDuotone className={getClassNames("text-green-600")} />;
    case "bat":
    case "cmd":
      return <PiFileCodeDuotone className={getClassNames("text-gray-600")} />;
    case "sh":
      return <PiFileCodeDuotone className={getClassNames("text-green-500")} />;
    case "ps1":
      return <PiFileCodeDuotone className={getClassNames("text-blue-600")} />;
    case "vb":
      return <PiFileCodeDuotone className={getClassNames("text-purple-600")} />;
    case "r":
      return <PiFileCodeDuotone className={getClassNames("text-blue-300")} />;
    case "tex":
      return <PiFileTextDuotone className={getClassNames("text-red-500")} />;
    case "scss":
      return <PiFileCssDuotone className={getClassNames("text-pink-500")} />;
    case "less":
      return <PiFileCssDuotone className={getClassNames("text-blue-300")} />;
    case "yaml":
    case "yml":
      return <PiFileCodeDuotone className={getClassNames("text-yellow-600")} />;
    case "toml":
      return <PiFileCodeDuotone className={getClassNames("text-orange-600")} />;
    case "lua":
      return <PiFileCodeDuotone className={getClassNames("text-blue-500")} />;
    case "perl":
    case "pl":
      return <PiFileCodeDuotone className={getClassNames("text-yellow-700")} />;
    case "dart":
      return <PiFileCodeDuotone className={getClassNames("text-cyan-400")} />;
    case "coffee":
      return <PiFileCodeDuotone className={getClassNames("text-brown-500")} />;
    case "h":
    case "hpp":
      return <PiFileCodeDuotone className={getClassNames("text-blue-700")} />;
    case "asm":
      return <PiFileCodeDuotone className={getClassNames("text-red-500")} />;
    case "wasm":
      return <PiFileCodeDuotone className={getClassNames("text-purple-600")} />;
    case "swift":
      return <PiFileCodeDuotone className={getClassNames("text-orange-400")} />;
    case "scala":
      return <PiFileCodeDuotone className={getClassNames("text-red-700")} />;
    case "tsv":
      return <PiFileCsvDuotone className={getClassNames("text-teal-600")} />;
    default:
      return <PiFileDuotone className={getClassNames("")} />;
  }
};

const FileViewer: React.FC<FileViewerProps> = ({ file }) => {
  const { name, size, extension, previewUrl, content } = file;
  let codeLanguage = "";
  switch (extension) {
    case "jsx":
      codeLanguage = "jsx";
      break;
    case "tsx":
      codeLanguage = "tsx";
      break;
    case "js":
      codeLanguage = "javascript";
      break;
    case "ts":
      codeLanguage = "typescript";
      break;
    case "c":
      codeLanguage = "c";
      break;
    case "cpp":
    case "c++":
      codeLanguage = "cpp";
      break;
    case "cs":
    case "csharp":
      codeLanguage = "csharp";
      break;
    case "rs":
      codeLanguage = "rust";
      break;
    case "py":
    case "python":
      codeLanguage = "python";
      break;
    case "xml":
    case "html":
      codeLanguage = "xml";
      break;
    case "json":
      codeLanguage = "json";
      break;
    case "java":
      codeLanguage = "java";
      break;
    case "go":
      codeLanguage = "go";
      break;
    case "php":
      codeLanguage = "php";
      break;
    case "sh":
    case "bash":
      codeLanguage = "bash";
      break;
    case "yaml":
    case "yml":
      codeLanguage = "yaml";
      break;
    case "rb":
    case "ruby":
      codeLanguage = "ruby";
      break;
    case "kt":
    case "kotlin":
      codeLanguage = "kotlin";
      break;
    case "dart":
      codeLanguage = "dart";
      break;
    case "swift":
      codeLanguage = "swift";
      break;
    case "pl":
    case "perl":
      codeLanguage = "perl";
      break;
    case "scss":
    case "css":
      codeLanguage = "css";
      break;
    case "md":
    case "markdown":
      codeLanguage = "markdown";
      break;
    case "sql":
      codeLanguage = "sql";
      break;
    case "graphql":
      codeLanguage = "graphql";
      break;
    case "m":
    case "mm":
    case "objc":
    case "objectivec":
      codeLanguage = "objectivec";
      break;
    case "ps1":
    case "powershell":
      codeLanguage = "powershell";
      break;
    case "ini":
      codeLanguage = "ini";
      break;
    case "conf":
    case "apacheconf":
      codeLanguage = "apacheconf";
      break;
    case "nginx":
      codeLanguage = "nginx";
      break;
    case "dockerfile":
    case "docker":
      codeLanguage = "docker";
      break;
    case "vim":
      codeLanguage = "vim";
      break;
    case "tex":
    case "latex":
      codeLanguage = "latex";
      break;
    case "r":
      codeLanguage = "r";
      break;
    case "m":
    case "matlab":
      codeLanguage = "matlab";
      break;
    case "sas":
      codeLanguage = "sas";
      break;
    case "asm":
    case "assembly":
      codeLanguage = "assembly";
      break;
    default:
      codeLanguage = "plaintext"; // Fallback for unsupported extensions
      break;
  }
  const theme = useTheme();
  const formattedSize =
    size <= 1024
      ? `${size} Bytes`
      : size <= 1024 * 1024
      ? `${(size / 1024).toFixed(2)} KB`
      : `${(size / (1024 * 1024)).toFixed(2)} MB`;
  const handleDownload = (file: any) => {
    const link = document.createElement("a");
    link.href = file.url; // Ensure file URL is available
    link.download = file.name; // Set the file name
    link.click();
  };

  const handleShare = (file: any) => {
    navigator.clipboard.writeText(file.url); // Copy URL to clipboard
    alert("File link copied to clipboard!");
  };

  const handleRename = (file: any) => {
    const newName = prompt("Enter new file name:", file.name);
    if (newName) {
      console.log(`Renamed ${file.name} to ${newName}`);
      // Implement renaming logic here
    }
  };

  const handleDelete = (file: any) => {
    if (confirm(`Are you sure you want to delete ${file.name}?`)) {
      console.log(`${file.name} deleted.`);
      // Implement deletion logic here
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <Card className="w-full h-screen border-muted max-w-full">
        <CardHeader className="flex flex-row  justify-between items-center">
          <div className="flex flex-row space-x-4 items-center">
            <CardTitle className="flex items-center space-x-2">
              {getFileIcon(file.extension)}
              <span>{name}</span>
            </CardTitle>
            <CardDescription>{formattedSize}</CardDescription>
          </div>
          <div className="flex space-x-2">
            {/* Download Button */}
            <Button
              className="hover:text-primary"
              onClick={() => handleDownload(file)}
              variant={"ghost"}
              title="info"
            >
              <PiInfoDuotone className="w-5 h-5 " />
            </Button>
            <Button
              className="hover:text-primary"
              onClick={() => handleDownload(file)}
              variant={"ghost"}
              title="Download"
            >
              <PiDownloadDuotone className="w-5 h-5 " />
            </Button>

            {/* Share Button */}
            <Button
              className="hover:text-primary"
              onClick={() => handleShare(file)}
              variant={"ghost"}
              title="Share"
            >
              <PiShareDuotone className="w-5 h-5 " />
            </Button>

            {/* Rename Button */}
            <Button
              className="hover:text-primary"
              onClick={() => handleRename(file)}
              variant={"ghost"}
              title="Rename"
            >
              <PiPenDuotone className="w-5 h-5 " />
            </Button>

            {/* Delete Button */}
            <Button
              className="hover:text-white"
              onClick={() => handleDelete(file)}
              variant={"destructive"}
              title="Delete"
            >
              <PiTrashDuotone className="w-5 h-5 hover:text-white" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="overflow-y-auto max-h-screen">
          {extension === "jpg" ||
          extension === "jpeg" ||
          extension === "png" ? (
            <Image
              height={700}
              width={1000}
              src={previewUrl as string}
              alt="File preview"
              className="w-full h-auto rounded-lg"
            />
          ) : extension === "pdf" ? (
            <iframe
              src={previewUrl as string}
              className="w-full h-screen rounded-lg"
              title="PDF Preview"
            />
          ) : extension === "mp4" ||
            extension === "mov" ||
            extension === "mkv" ? (
            <video
              controls
              className="w-full h-auto rounded-lg"
              onError={() => console.error("Video loading error!")}
            >
              <source src={previewUrl as string} type={`video/${extension}`} />
              Your browser does not support the video tag.
            </video>
          ) : extension === "mp3" || extension === "wav" ? (
            <audio controls className="w-full">
              <source src={previewUrl as string} type={`audio/${extension}`} />
              Your browser does not support the audio element.
            </audio>
          ) : textExtensions.find((e) => e === extension) ? (
            <div className="overflow-auto max-h-[calc(100vh-200px)]  rounded-lg">
              <SyntaxHighlighter
                customStyle={{
                  borderRadius: "12px",
                  overflow: "visible",
                }}
                language={codeLanguage}
                style={theme.theme === "light" ? materialLight : nightOwl}
              >
                {content as string}
              </SyntaxHighlighter>
            </div>
          ) : (
            <div className="text-center ">No preview available</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FileViewer;
