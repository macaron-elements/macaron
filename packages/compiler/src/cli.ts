import chokidar from "chokidar";
import glob from "glob";
import { Command } from "commander";
import { compileFile } from "./compiler";

function compileFiles(
  filePathOrGlobs: string[],
  options: {
    watch?: boolean;
    output?: string;
  }
): void {
  const filePaths = new Set(filePathOrGlobs.flatMap((f) => glob.sync(f)));

  if (options.watch) {
    const watcher = chokidar.watch(filePathOrGlobs);

    const onChangeAdd = (filePath: string) => {
      try {
        compileFile(filePath);
      } catch (e) {
        console.error(e);
      }
    };

    watcher.on("change", onChangeAdd);
    watcher.on("add", onChangeAdd);
  }

  for (const filePath of filePaths) {
    compileFile(filePath);
  }
}

const program = new Command("macaron");
program.version("0.0.1");

program
  .option("--watch", "Watch files for changes")
  .option("-o, --output <directory>", "Output directory")
  .argument("<files...>")
  .action((files: string[], options: { watch?: boolean; output?: string }) => {
    console.log(options);
    compileFiles(files, options);
  });

program.parse(process.argv);
