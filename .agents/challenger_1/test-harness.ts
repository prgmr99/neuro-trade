import * as ts from 'typescript';

function checkFileCompileErrors(filePath: string): string[] {
    const program = ts.createProgram([filePath], {
        noEmit: true,
        esModuleInterop: true,
        jsx: ts.JsxEmit.React,
        strict: true
    });
    
    const diagnostics = ts.getPreEmitDiagnostics(program);
    const errors: string[] = [];
    
    diagnostics.forEach(diagnostic => {
        if (diagnostic.file) {
            const { line, character } = ts.getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start!);
            const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
            errors.push(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
        }
    });

    return errors;
}

export function runTests() {
    console.log("Running compilation oracle on RoomBattle.tsx...");
    const errors = checkFileCompileErrors('src/components/RoomBattle/RoomBattle.tsx');
    if (errors.length > 0) {
        console.error("Compile Errors Found:");
        errors.forEach(e => console.error(e));
        // We expect an error about `isConnected` not being found
    } else {
        console.log("No compile errors.");
    }
}
