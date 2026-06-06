import * as ts from 'typescript';
import * as fs from 'fs';

function checkFile(filePath: string) {
    const program = ts.createProgram([filePath], {
        noEmit: true,
        esModuleInterop: true,
        jsx: ts.JsxEmit.React,
        strict: true
    });
    
    const diagnostics = ts.getPreEmitDiagnostics(program);
    let errorCount = 0;
    
    diagnostics.forEach(diagnostic => {
        if (diagnostic.file) {
            const { line, character } = ts.getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start!);
            const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
            console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
            errorCount++;
        }
    });

    if (errorCount > 0) {
        console.log(`Found ${errorCount} errors.`);
        process.exit(1);
    } else {
        console.log("No errors found.");
    }
}

checkFile('src/components/RoomBattle/RoomBattle.tsx');
