/*! Created By MumbleFe. Copyright © 2015 - 2018 WeBank. */
webpackJsonp([2],{1101:function(e,t,n){"use strict";function setupMode(e){var t=new r.WorkerManager(e),n=function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];return t.getLanguageServiceWorker.apply(t,e)},i=e.languageId;monaco.languages.registerCompletionItemProvider(i,new o.CompletionAdapter(n)),monaco.languages.registerHoverProvider(i,new o.HoverAdapter(n)),monaco.languages.registerDocumentHighlightProvider(i,new o.DocumentHighlightAdapter(n)),monaco.languages.registerLinkProvider(i,new o.DocumentLinkAdapter(n)),monaco.languages.registerFoldingRangeProvider(i,new o.FoldingRangeAdapter(n)),monaco.languages.registerDocumentSymbolProvider(i,new o.DocumentSymbolAdapter(n)),"html"===i&&(monaco.languages.registerDocumentFormattingEditProvider(i,new o.DocumentFormattingEditProvider(n)),monaco.languages.registerDocumentRangeFormattingEditProvider(i,new o.DocumentRangeFormattingEditProvider(n)),new o.DiagnosticsAdapter(i,n,e))}Object.defineProperty(t,"__esModule",{value:!0}),t.setupMode=setupMode;var r=n(1168),i=n(1169),o=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(i)},1168:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function WorkerManager(e){var t=this;this._defaults=e,this._worker=null,this._idleCheckInterval=setInterval(function(){return t._checkIfIdle()},3e4),this._lastUsedTime=0,this._configChangeListener=this._defaults.onDidChange(function(){return t._stopWorker()})}return WorkerManager.prototype._stopWorker=function(){this._worker&&(this._worker.dispose(),this._worker=null),this._client=null},WorkerManager.prototype.dispose=function(){clearInterval(this._idleCheckInterval),this._configChangeListener.dispose(),this._stopWorker()},WorkerManager.prototype._checkIfIdle=function(){if(this._worker){Date.now()-this._lastUsedTime>12e4&&this._stopWorker()}},WorkerManager.prototype._getClient=function(){return this._lastUsedTime=Date.now(),this._client||(this._worker=monaco.editor.createWebWorker({moduleId:"vs/language/html/htmlWorker",createData:{languageSettings:this._defaults.options,languageId:this._defaults.languageId},label:this._defaults.languageId}),this._client=this._worker.getProxy()),this._client},WorkerManager.prototype.getLanguageServiceWorker=function(){for(var e=this,t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];var r;return this._getClient().then(function(e){r=e}).then(function(n){return e._worker.withSyncedResources(t)}).then(function(e){return r})},WorkerManager}();t.WorkerManager=r},1169:function(e,t,n){"use strict";function toSeverity(e){switch(e){case o.DiagnosticSeverity.Error:return monaco.MarkerSeverity.Error;case o.DiagnosticSeverity.Warning:return monaco.MarkerSeverity.Warning;case o.DiagnosticSeverity.Information:return monaco.MarkerSeverity.Info;case o.DiagnosticSeverity.Hint:return monaco.MarkerSeverity.Hint;default:return monaco.MarkerSeverity.Info}}function toDiagnostics(e,t){var n="number"==typeof t.code?String(t.code):t.code;return{severity:toSeverity(t.severity),startLineNumber:t.range.start.line+1,startColumn:t.range.start.character+1,endLineNumber:t.range.end.line+1,endColumn:t.range.end.character+1,message:t.message,code:n,source:t.source}}function fromPosition(e){if(e)return{character:e.column-1,line:e.lineNumber-1}}function fromRange(e){if(e)return{start:fromPosition(e.getStartPosition()),end:fromPosition(e.getEndPosition())}}function toRange(e){if(e)return new a(e.start.line+1,e.start.character+1,e.end.line+1,e.end.character+1)}function toCompletionItemKind(e){var t=monaco.languages.CompletionItemKind;switch(e){case o.CompletionItemKind.Text:return t.Text;case o.CompletionItemKind.Method:return t.Method;case o.CompletionItemKind.Function:return t.Function;case o.CompletionItemKind.Constructor:return t.Constructor;case o.CompletionItemKind.Field:return t.Field;case o.CompletionItemKind.Variable:return t.Variable;case o.CompletionItemKind.Class:return t.Class;case o.CompletionItemKind.Interface:return t.Interface;case o.CompletionItemKind.Module:return t.Module;case o.CompletionItemKind.Property:return t.Property;case o.CompletionItemKind.Unit:return t.Unit;case o.CompletionItemKind.Value:return t.Value;case o.CompletionItemKind.Enum:return t.Enum;case o.CompletionItemKind.Keyword:return t.Keyword;case o.CompletionItemKind.Snippet:return t.Snippet;case o.CompletionItemKind.Color:return t.Color;case o.CompletionItemKind.File:return t.File;case o.CompletionItemKind.Reference:return t.Reference}return t.Property}function toTextEdit(e){if(e)return{range:toRange(e.range),text:e.newText}}function isMarkupContent(e){return e&&"object"===(void 0===e?"undefined":r(e))&&"string"==typeof e.kind}function toMarkdownString(e){return"string"==typeof e?{value:e}:isMarkupContent(e)?"plaintext"===e.kind?{value:e.value.replace(/[\\`*_{}[\]()#+\-.!]/g,"\\$&")}:{value:e.value}:{value:"```"+e.language+"\n"+e.value+"\n```\n"}}function toMarkedStringArray(e){if(e)return Array.isArray(e)?e.map(toMarkdownString):[toMarkdownString(e)]}function toHighlighKind(e){var t=monaco.languages.DocumentHighlightKind;switch(e){case o.DocumentHighlightKind.Read:return t.Read;case o.DocumentHighlightKind.Write:return t.Write;case o.DocumentHighlightKind.Text:return t.Text}return t.Text}function toSymbolKind(e){var t=monaco.languages.SymbolKind;switch(e){case o.SymbolKind.File:return t.Array;case o.SymbolKind.Module:return t.Module;case o.SymbolKind.Namespace:return t.Namespace;case o.SymbolKind.Package:return t.Package;case o.SymbolKind.Class:return t.Class;case o.SymbolKind.Method:return t.Method;case o.SymbolKind.Property:return t.Property;case o.SymbolKind.Field:return t.Field;case o.SymbolKind.Constructor:return t.Constructor;case o.SymbolKind.Enum:return t.Enum;case o.SymbolKind.Interface:return t.Interface;case o.SymbolKind.Function:return t.Function;case o.SymbolKind.Variable:return t.Variable;case o.SymbolKind.Constant:return t.Constant;case o.SymbolKind.String:return t.String;case o.SymbolKind.Number:return t.Number;case o.SymbolKind.Boolean:return t.Boolean;case o.SymbolKind.Array:return t.Array}return t.Function}function fromFormattingOptions(e){return{tabSize:e.tabSize,insertSpaces:e.insertSpaces}}function toFoldingRangeKind(e){switch(e){case o.FoldingRangeKind.Comment:return monaco.languages.FoldingRangeKind.Comment;case o.FoldingRangeKind.Imports:return monaco.languages.FoldingRangeKind.Imports;case o.FoldingRangeKind.Region:return monaco.languages.FoldingRangeKind.Region}}Object.defineProperty(t,"__esModule",{value:!0}),t.FoldingRangeAdapter=t.DocumentRangeFormattingEditProvider=t.DocumentFormattingEditProvider=t.DocumentLinkAdapter=t.DocumentSymbolAdapter=t.DocumentHighlightAdapter=t.HoverAdapter=t.CompletionAdapter=t.DiagnosticsAdapter=void 0;var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i=n(1170),o=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(i),a=monaco.Range,u=function(){function DiagnosticsAdapter(e,t,n){var r=this;this._languageId=e,this._worker=t,this._disposables=[],this._listener=Object.create(null);var i=function(e){var t=e.getModeId();if(t===r._languageId){var n;r._listener[e.uri.toString()]=e.onDidChangeContent(function(){clearTimeout(n),n=setTimeout(function(){return r._doValidate(e.uri,t)},500)}),r._doValidate(e.uri,t)}},o=function(e){monaco.editor.setModelMarkers(e,r._languageId,[]);var t=e.uri.toString(),n=r._listener[t];n&&(n.dispose(),delete r._listener[t])};this._disposables.push(monaco.editor.onDidCreateModel(i)),this._disposables.push(monaco.editor.onWillDisposeModel(function(e){o(e)})),this._disposables.push(monaco.editor.onDidChangeModelLanguage(function(e){o(e.model),i(e.model)})),this._disposables.push(n.onDidChange(function(e){monaco.editor.getModels().forEach(function(e){e.getModeId()===r._languageId&&(o(e),i(e))})})),this._disposables.push({dispose:function(){for(var e in r._listener)r._listener[e].dispose()}}),monaco.editor.getModels().forEach(i)}return DiagnosticsAdapter.prototype.dispose=function(){this._disposables.forEach(function(e){return e&&e.dispose()}),this._disposables=[]},DiagnosticsAdapter.prototype._doValidate=function(e,t){this._worker(e).then(function(n){return n.doValidation(e.toString()).then(function(n){var r=n.map(function(t){return toDiagnostics(e,t)});monaco.editor.setModelMarkers(monaco.editor.getModel(e),t,r)})}).then(void 0,function(e){console.error(e)})},DiagnosticsAdapter}();t.DiagnosticsAdapter=u;var c=function(){function CompletionAdapter(e){this._worker=e}return Object.defineProperty(CompletionAdapter.prototype,"triggerCharacters",{get:function(){return[".",":","<",'"',"=","/"]},enumerable:!0,configurable:!0}),CompletionAdapter.prototype.provideCompletionItems=function(e,t,n,r){var i=e.uri;return this._worker(i).then(function(e){return e.doComplete(i.toString(),fromPosition(t))}).then(function(n){if(n){var r=e.getWordUntilPosition(t),i=new a(t.lineNumber,r.startColumn,t.lineNumber,r.endColumn),u=n.items.map(function(e){var t={label:e.label,insertText:e.insertText||e.label,sortText:e.sortText,filterText:e.filterText,documentation:e.documentation,detail:e.detail,range:i,kind:toCompletionItemKind(e.kind)};return e.textEdit&&(t.range=toRange(e.textEdit.range),t.insertText=e.textEdit.newText),e.additionalTextEdits&&(t.additionalTextEdits=e.additionalTextEdits.map(toTextEdit)),e.insertTextFormat===o.InsertTextFormat.Snippet&&(t.insertTextRules=monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet),t});return{isIncomplete:n.isIncomplete,suggestions:u}}})},CompletionAdapter}();t.CompletionAdapter=c;var s=function(){function HoverAdapter(e){this._worker=e}return HoverAdapter.prototype.provideHover=function(e,t,n){var r=e.uri;return this._worker(r).then(function(e){return e.doHover(r.toString(),fromPosition(t))}).then(function(e){if(e)return{range:toRange(e.range),contents:toMarkedStringArray(e.contents)}})},HoverAdapter}();t.HoverAdapter=s;var d=function(){function DocumentHighlightAdapter(e){this._worker=e}return DocumentHighlightAdapter.prototype.provideDocumentHighlights=function(e,t,n){var r=e.uri;return this._worker(r).then(function(e){return e.findDocumentHighlights(r.toString(),fromPosition(t))}).then(function(e){if(e)return e.map(function(e){return{range:toRange(e.range),kind:toHighlighKind(e.kind)}})})},DocumentHighlightAdapter}();t.DocumentHighlightAdapter=d;var l=function(){function DocumentSymbolAdapter(e){this._worker=e}return DocumentSymbolAdapter.prototype.provideDocumentSymbols=function(e,t){var n=e.uri;return this._worker(n).then(function(e){return e.findDocumentSymbols(n.toString())}).then(function(e){if(e)return e.map(function(e){return{name:e.name,detail:"",containerName:e.containerName,kind:toSymbolKind(e.kind),range:toRange(e.location.range),selectionRange:toRange(e.location.range)}})})},DocumentSymbolAdapter}();t.DocumentSymbolAdapter=l;var g=function(){function DocumentLinkAdapter(e){this._worker=e}return DocumentLinkAdapter.prototype.provideLinks=function(e,t){var n=e.uri;return this._worker(n).then(function(e){return e.findDocumentLinks(n.toString())}).then(function(e){if(e)return{links:e.map(function(e){return{range:toRange(e.range),url:e.target}})}})},DocumentLinkAdapter}();t.DocumentLinkAdapter=g;var f=function(){function DocumentFormattingEditProvider(e){this._worker=e}return DocumentFormattingEditProvider.prototype.provideDocumentFormattingEdits=function(e,t,n){var r=e.uri;return this._worker(r).then(function(e){return e.format(r.toString(),null,fromFormattingOptions(t)).then(function(e){if(e&&0!==e.length)return e.map(toTextEdit)})})},DocumentFormattingEditProvider}();t.DocumentFormattingEditProvider=f;var m=function(){function DocumentRangeFormattingEditProvider(e){this._worker=e}return DocumentRangeFormattingEditProvider.prototype.provideDocumentRangeFormattingEdits=function(e,t,n,r){var i=e.uri;return this._worker(i).then(function(e){return e.format(i.toString(),fromRange(t),fromFormattingOptions(n)).then(function(e){if(e&&0!==e.length)return e.map(toTextEdit)})})},DocumentRangeFormattingEditProvider}();t.DocumentRangeFormattingEditProvider=m;var p=function(){function FoldingRangeAdapter(e){this._worker=e}return FoldingRangeAdapter.prototype.provideFoldingRanges=function(e,t,n){var r=e.uri;return this._worker(r).then(function(e){return e.provideFoldingRanges(r.toString(),t)}).then(function(e){if(e)return e.map(function(e){var t={start:e.startLine+1,end:e.endLine+1};return void 0!==e.kind&&(t.kind=toFoldingRangeKind(e.kind)),t})})},FoldingRangeAdapter}();t.FoldingRangeAdapter=p},1170:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i=t.Position=void 0;(function(e){function create(e,t){return{line:e,character:t}}function is(e){var t=e;return X.objectLiteral(t)&&X.number(t.line)&&X.number(t.character)}e.create=create,e.is=is})(i||(t.Position=i={}));var o=t.Range=void 0;(function(e){function create(e,t,n,r){if(X.number(e)&&X.number(t)&&X.number(n)&&X.number(r))return{start:i.create(e,t),end:i.create(n,r)};if(i.is(e)&&i.is(t))return{start:e,end:t};throw new Error("Range#create called with invalid arguments["+e+", "+t+", "+n+", "+r+"]")}function is(e){var t=e;return X.objectLiteral(t)&&i.is(t.start)&&i.is(t.end)}e.create=create,e.is=is})(o||(t.Range=o={}));var a=t.Location=void 0;(function(e){function create(e,t){return{uri:e,range:t}}function is(e){var t=e;return X.defined(t)&&o.is(t.range)&&(X.string(t.uri)||X.undefined(t.uri))}e.create=create,e.is=is})(a||(t.Location=a={}));var u=t.LocationLink=void 0;(function(e){function create(e,t,n,r){return{targetUri:e,targetRange:t,targetSelectionRange:n,originSelectionRange:r}}function is(e){var t=e;return X.defined(t)&&o.is(t.targetRange)&&X.string(t.targetUri)&&(o.is(t.targetSelectionRange)||X.undefined(t.targetSelectionRange))&&(o.is(t.originSelectionRange)||X.undefined(t.originSelectionRange))}e.create=create,e.is=is})(u||(t.LocationLink=u={}));var c=t.Color=void 0;(function(e){function create(e,t,n,r){return{red:e,green:t,blue:n,alpha:r}}function is(e){var t=e;return X.number(t.red)&&X.number(t.green)&&X.number(t.blue)&&X.number(t.alpha)}e.create=create,e.is=is})(c||(t.Color=c={}));var s=t.ColorInformation=void 0;(function(e){function create(e,t){return{range:e,color:t}}function is(e){var t=e;return o.is(t.range)&&c.is(t.color)}e.create=create,e.is=is})(s||(t.ColorInformation=s={}));var d=t.ColorPresentation=void 0;(function(e){function create(e,t,n){return{label:e,textEdit:t,additionalTextEdits:n}}function is(e){var t=e;return X.string(t.label)&&(X.undefined(t.textEdit)||h.is(t))&&(X.undefined(t.additionalTextEdits)||X.typedArray(t.additionalTextEdits,h.is))}e.create=create,e.is=is})(d||(t.ColorPresentation=d={}));var l=t.FoldingRangeKind=void 0;(function(e){e.Comment="comment",e.Imports="imports",e.Region="region"})(l||(t.FoldingRangeKind=l={}));var g=t.FoldingRange=void 0;(function(e){function create(e,t,n,r,i){var o={startLine:e,endLine:t};return X.defined(n)&&(o.startCharacter=n),X.defined(r)&&(o.endCharacter=r),X.defined(i)&&(o.kind=i),o}function is(e){var t=e;return X.number(t.startLine)&&X.number(t.startLine)&&(X.undefined(t.startCharacter)||X.number(t.startCharacter))&&(X.undefined(t.endCharacter)||X.number(t.endCharacter))&&(X.undefined(t.kind)||X.string(t.kind))}e.create=create,e.is=is})(g||(t.FoldingRange=g={}));var f=t.DiagnosticRelatedInformation=void 0;(function(e){function create(e,t){return{location:e,message:t}}function is(e){var t=e;return X.defined(t)&&a.is(t.location)&&X.string(t.message)}e.create=create,e.is=is})(f||(t.DiagnosticRelatedInformation=f={}));var m=t.DiagnosticSeverity=void 0;(function(e){e.Error=1,e.Warning=2,e.Information=3,e.Hint=4})(m||(t.DiagnosticSeverity=m={}));var p=t.Diagnostic=void 0;(function(e){function create(e,t,n,r,i,o){var a={range:e,message:t};return X.defined(n)&&(a.severity=n),X.defined(r)&&(a.code=r),X.defined(i)&&(a.source=i),X.defined(o)&&(a.relatedInformation=o),a}function is(e){var t=e;return X.defined(t)&&o.is(t.range)&&X.string(t.message)&&(X.number(t.severity)||X.undefined(t.severity))&&(X.number(t.code)||X.string(t.code)||X.undefined(t.code))&&(X.string(t.source)||X.undefined(t.source))&&(X.undefined(t.relatedInformation)||X.typedArray(t.relatedInformation,f.is))}e.create=create,e.is=is})(p||(t.Diagnostic=p={}));var v=t.Command=void 0;(function(e){function create(e,t){for(var n=[],r=2;r<arguments.length;r++)n[r-2]=arguments[r];var i={title:e,command:t};return X.defined(n)&&n.length>0&&(i.arguments=n),i}function is(e){var t=e;return X.defined(t)&&X.string(t.title)&&X.string(t.command)}e.create=create,e.is=is})(v||(t.Command=v={}));var h=t.TextEdit=void 0;(function(e){function replace(e,t){return{range:e,newText:t}}function insert(e,t){return{range:{start:e,end:e},newText:t}}function del(e){return{range:e,newText:""}}function is(e){var t=e;return X.objectLiteral(t)&&X.string(t.newText)&&o.is(t.range)}e.replace=replace,e.insert=insert,e.del=del,e.is=is})(h||(t.TextEdit=h={}));var y=t.TextDocumentEdit=void 0;(function(e){function create(e,t){return{textDocument:e,edits:t}}function is(e){var t=e;return X.defined(t)&&I.is(t.textDocument)&&Array.isArray(t.edits)}e.create=create,e.is=is})(y||(t.TextDocumentEdit=y={}));var b=t.CreateFile=void 0;(function(e){function create(e,t){var n={kind:"create",uri:e};return void 0===t||void 0===t.overwrite&&void 0===t.ignoreIfExists||(n.options=t),n}function is(e){var t=e;return t&&"create"===t.kind&&X.string(t.uri)&&(void 0===t.options||(void 0===t.options.overwrite||X.boolean(t.options.overwrite))&&(void 0===t.options.ignoreIfExists||X.boolean(t.options.ignoreIfExists)))}e.create=create,e.is=is})(b||(t.CreateFile=b={}));var k=t.RenameFile=void 0;(function(e){function create(e,t,n){var r={kind:"rename",oldUri:e,newUri:t};return void 0===n||void 0===n.overwrite&&void 0===n.ignoreIfExists||(r.options=n),r}function is(e){var t=e;return t&&"rename"===t.kind&&X.string(t.oldUri)&&X.string(t.newUri)&&(void 0===t.options||(void 0===t.options.overwrite||X.boolean(t.options.overwrite))&&(void 0===t.options.ignoreIfExists||X.boolean(t.options.ignoreIfExists)))}e.create=create,e.is=is})(k||(t.RenameFile=k={}));var C=t.DeleteFile=void 0;(function(e){function create(e,t){var n={kind:"delete",uri:e};return void 0===t||void 0===t.recursive&&void 0===t.ignoreIfNotExists||(n.options=t),n}function is(e){var t=e;return t&&"delete"===t.kind&&X.string(t.uri)&&(void 0===t.options||(void 0===t.options.recursive||X.boolean(t.options.recursive))&&(void 0===t.options.ignoreIfNotExists||X.boolean(t.options.ignoreIfNotExists)))}e.create=create,e.is=is})(C||(t.DeleteFile=C={}));var _=t.WorkspaceEdit=void 0;(function(e){function is(e){var t=e;return t&&(void 0!==t.changes||void 0!==t.documentChanges)&&(void 0===t.documentChanges||t.documentChanges.every(function(e){return X.string(e.kind)?b.is(e)||k.is(e)||C.is(e):y.is(e)}))}e.is=is})(_||(t.WorkspaceEdit=_={}));var S=function(){function TextEditChangeImpl(e){this.edits=e}return TextEditChangeImpl.prototype.insert=function(e,t){this.edits.push(h.insert(e,t))},TextEditChangeImpl.prototype.replace=function(e,t){this.edits.push(h.replace(e,t))},TextEditChangeImpl.prototype.delete=function(e){this.edits.push(h.del(e))},TextEditChangeImpl.prototype.add=function(e){this.edits.push(e)},TextEditChangeImpl.prototype.all=function(){return this.edits},TextEditChangeImpl.prototype.clear=function(){this.edits.splice(0,this.edits.length)},TextEditChangeImpl}(),x=function(){function WorkspaceChange(e){var t=this;this._textEditChanges=Object.create(null),e&&(this._workspaceEdit=e,e.documentChanges?e.documentChanges.forEach(function(e){if(y.is(e)){var n=new S(e.edits);t._textEditChanges[e.textDocument.uri]=n}}):e.changes&&Object.keys(e.changes).forEach(function(n){var r=new S(e.changes[n]);t._textEditChanges[n]=r}))}return Object.defineProperty(WorkspaceChange.prototype,"edit",{get:function(){return this._workspaceEdit},enumerable:!0,configurable:!0}),WorkspaceChange.prototype.getTextEditChange=function(e){if(I.is(e)){if(this._workspaceEdit||(this._workspaceEdit={documentChanges:[]}),!this._workspaceEdit.documentChanges)throw new Error("Workspace edit is not configured for document changes.");var t=e,n=this._textEditChanges[t.uri];if(!n){var r=[],i={textDocument:t,edits:r};this._workspaceEdit.documentChanges.push(i),n=new S(r),this._textEditChanges[t.uri]=n}return n}if(this._workspaceEdit||(this._workspaceEdit={changes:Object.create(null)}),!this._workspaceEdit.changes)throw new Error("Workspace edit is not configured for normal text edit changes.");var n=this._textEditChanges[e];if(!n){var r=[];this._workspaceEdit.changes[e]=r,n=new S(r),this._textEditChanges[e]=n}return n},WorkspaceChange.prototype.createFile=function(e,t){this.checkDocumentChanges(),this._workspaceEdit.documentChanges.push(b.create(e,t))},WorkspaceChange.prototype.renameFile=function(e,t,n){this.checkDocumentChanges(),this._workspaceEdit.documentChanges.push(k.create(e,t,n))},WorkspaceChange.prototype.deleteFile=function(e,t){this.checkDocumentChanges(),this._workspaceEdit.documentChanges.push(C.create(e,t))},WorkspaceChange.prototype.checkDocumentChanges=function(){if(!this._workspaceEdit||!this._workspaceEdit.documentChanges)throw new Error("Workspace edit is not configured for document changes.")},WorkspaceChange}();t.WorkspaceChange=x;var D=t.TextDocumentIdentifier=void 0;(function(e){function create(e){return{uri:e}}function is(e){var t=e;return X.defined(t)&&X.string(t.uri)}e.create=create,e.is=is})(D||(t.TextDocumentIdentifier=D={}));var I=t.VersionedTextDocumentIdentifier=void 0;(function(e){function create(e,t){return{uri:e,version:t}}function is(e){var t=e;return X.defined(t)&&X.string(t.uri)&&(null===t.version||X.number(t.version))}e.create=create,e.is=is})(I||(t.VersionedTextDocumentIdentifier=I={}));var w=t.TextDocumentItem=void 0;(function(e){function create(e,t,n,r){return{uri:e,languageId:t,version:n,text:r}}function is(e){var t=e;return X.defined(t)&&X.string(t.uri)&&X.string(t.languageId)&&X.number(t.version)&&X.string(t.text)}e.create=create,e.is=is})(w||(t.TextDocumentItem=w={}));var E=t.MarkupKind=void 0;(function(e){e.PlainText="plaintext",e.Markdown="markdown"})(E||(t.MarkupKind=E={})),function(e){function is(t){var n=t;return n===e.PlainText||n===e.Markdown}e.is=is}(E||(t.MarkupKind=E={}));var F=t.MarkupContent=void 0;(function(e){function is(e){var t=e;return X.objectLiteral(e)&&E.is(t.kind)&&X.string(t.value)}e.is=is})(F||(t.MarkupContent=F={}));var T=t.CompletionItemKind=void 0;(function(e){e.Text=1,e.Method=2,e.Function=3,e.Constructor=4,e.Field=5,e.Variable=6,e.Class=7,e.Interface=8,e.Module=9,e.Property=10,e.Unit=11,e.Value=12,e.Enum=13,e.Keyword=14,e.Snippet=15,e.Color=16,e.File=17,e.Reference=18,e.Folder=19,e.EnumMember=20,e.Constant=21,e.Struct=22,e.Event=23,e.Operator=24,e.TypeParameter=25})(T||(t.CompletionItemKind=T={}));var A=t.InsertTextFormat=void 0;(function(e){e.PlainText=1,e.Snippet=2})(A||(t.InsertTextFormat=A={}));var R=t.CompletionItem=void 0;(function(e){function create(e){return{label:e}}e.create=create})(R||(t.CompletionItem=R={}));var K=t.CompletionList=void 0;(function(e){function create(e,t){return{items:e||[],isIncomplete:!!t}}e.create=create})(K||(t.CompletionList=K={}));var M=t.MarkedString=void 0;(function(e){function fromPlainText(e){return e.replace(/[\\`*_{}[\]()#+\-.!]/g,"\\$&")}function is(e){var t=e;return X.string(t)||X.objectLiteral(t)&&X.string(t.language)&&X.string(t.value)}e.fromPlainText=fromPlainText,e.is=is})(M||(t.MarkedString=M={}));var P=t.Hover=void 0;(function(e){function is(e){var t=e;return!!t&&X.objectLiteral(t)&&(F.is(t.contents)||M.is(t.contents)||X.typedArray(t.contents,M.is))&&(void 0===e.range||o.is(e.range))}e.is=is})(P||(t.Hover=P={}));var L=t.ParameterInformation=void 0;(function(e){function create(e,t){return t?{label:e,documentation:t}:{label:e}}e.create=create})(L||(t.ParameterInformation=L={}));var O=t.SignatureInformation=void 0;(function(e){function create(e,t){for(var n=[],r=2;r<arguments.length;r++)n[r-2]=arguments[r];var i={label:e};return X.defined(t)&&(i.documentation=t),X.defined(n)?i.parameters=n:i.parameters=[],i}e.create=create})(O||(t.SignatureInformation=O={}));var W=t.DocumentHighlightKind=void 0;(function(e){e.Text=1,e.Read=2,e.Write=3})(W||(t.DocumentHighlightKind=W={}));var H=t.DocumentHighlight=void 0;(function(e){function create(e,t){var n={range:e};return X.number(t)&&(n.kind=t),n}e.create=create})(H||(t.DocumentHighlight=H={}));var j=t.SymbolKind=void 0;(function(e){e.File=1,e.Module=2,e.Namespace=3,e.Package=4,e.Class=5,e.Method=6,e.Property=7,e.Field=8,e.Constructor=9,e.Enum=10,e.Interface=11,e.Function=12,e.Variable=13,e.Constant=14,e.String=15,e.Number=16,e.Boolean=17,e.Array=18,e.Object=19,e.Key=20,e.Null=21,e.EnumMember=22,e.Struct=23,e.Event=24,e.Operator=25,e.TypeParameter=26})(j||(t.SymbolKind=j={}));var N=t.SymbolInformation=void 0;(function(e){function create(e,t,n,r,i){var o={name:e,kind:t,location:{uri:r,range:n}};return i&&(o.containerName=i),o}e.create=create})(N||(t.SymbolInformation=N={}));var V=function(){function DocumentSymbol(){}return DocumentSymbol}();t.DocumentSymbol=V,function(e){function create(e,t,n,r,i,o){var a={name:e,detail:t,kind:n,range:r,selectionRange:i};return void 0!==o&&(a.children=o),a}function is(e){var t=e;return t&&X.string(t.name)&&X.number(t.kind)&&o.is(t.range)&&o.is(t.selectionRange)&&(void 0===t.detail||X.string(t.detail))&&(void 0===t.deprecated||X.boolean(t.deprecated))&&(void 0===t.children||Array.isArray(t.children))}e.create=create,e.is=is}(V||(t.DocumentSymbol=V={}));var U=t.CodeActionKind=void 0;(function(e){e.QuickFix="quickfix",e.Refactor="refactor",e.RefactorExtract="refactor.extract",e.RefactorInline="refactor.inline",e.RefactorRewrite="refactor.rewrite",e.Source="source",e.SourceOrganizeImports="source.organizeImports"})(U||(t.CodeActionKind=U={}));var z=t.CodeActionContext=void 0;(function(e){function create(e,t){var n={diagnostics:e};return void 0!==t&&null!==t&&(n.only=t),n}function is(e){var t=e;return X.defined(t)&&X.typedArray(t.diagnostics,p.is)&&(void 0===t.only||X.typedArray(t.only,X.string))}e.create=create,e.is=is})(z||(t.CodeActionContext=z={}));var B=t.CodeAction=void 0;(function(e){function create(e,t,n){var r={title:e};return v.is(t)?r.command=t:r.edit=t,void 0!==n&&(r.kind=n),r}function is(e){var t=e;return t&&X.string(t.title)&&(void 0===t.diagnostics||X.typedArray(t.diagnostics,p.is))&&(void 0===t.kind||X.string(t.kind))&&(void 0!==t.edit||void 0!==t.command)&&(void 0===t.command||v.is(t.command))&&(void 0===t.edit||_.is(t.edit))}e.create=create,e.is=is})(B||(t.CodeAction=B={}));var $=t.CodeLens=void 0;(function(e){function create(e,t){var n={range:e};return X.defined(t)&&(n.data=t),n}function is(e){var t=e;return X.defined(t)&&o.is(t.range)&&(X.undefined(t.command)||v.is(t.command))}e.create=create,e.is=is})($||(t.CodeLens=$={}));var q=t.FormattingOptions=void 0;(function(e){function create(e,t){return{tabSize:e,insertSpaces:t}}function is(e){var t=e;return X.defined(t)&&X.number(t.tabSize)&&X.boolean(t.insertSpaces)}e.create=create,e.is=is})(q||(t.FormattingOptions=q={}));var J=function(){function DocumentLink(){}return DocumentLink}();t.DocumentLink=J,function(e){function create(e,t,n){return{range:e,target:t,data:n}}function is(e){var t=e;return X.defined(t)&&o.is(t.range)&&(X.undefined(t.target)||X.string(t.target))}e.create=create,e.is=is}(J||(t.DocumentLink=J={}));var Q=(t.EOL=["\n","\r\n","\r"],t.TextDocument=void 0);(function(e){function create(e,t,n,r){return new Y(e,t,n,r)}function is(e){var t=e;return!!(X.defined(t)&&X.string(t.uri)&&(X.undefined(t.languageId)||X.string(t.languageId))&&X.number(t.lineCount)&&X.func(t.getText)&&X.func(t.positionAt)&&X.func(t.offsetAt))}function applyEdits(e,t){for(var n=e.getText(),r=mergeSort(t,function(e,t){var n=e.range.start.line-t.range.start.line;return 0===n?e.range.start.character-t.range.start.character:n}),i=n.length,o=r.length-1;o>=0;o--){var a=r[o],u=e.offsetAt(a.range.start),c=e.offsetAt(a.range.end);if(!(c<=i))throw new Error("Overlapping edit");n=n.substring(0,u)+a.newText+n.substring(c,n.length),i=u}return n}function mergeSort(e,t){if(e.length<=1)return e;var n=e.length/2|0,r=e.slice(0,n),i=e.slice(n);mergeSort(r,t),mergeSort(i,t);for(var o=0,a=0,u=0;o<r.length&&a<i.length;){var c=t(r[o],i[a]);e[u++]=c<=0?r[o++]:i[a++]}for(;o<r.length;)e[u++]=r[o++];for(;a<i.length;)e[u++]=i[a++];return e}e.create=create,e.is=is,e.applyEdits=applyEdits})(Q||(t.TextDocument=Q={}));var G=t.TextDocumentSaveReason=void 0;(function(e){e.Manual=1,e.AfterDelay=2,e.FocusOut=3})(G||(t.TextDocumentSaveReason=G={}));var X,Y=function(){function FullTextDocument(e,t,n,r){this._uri=e,this._languageId=t,this._version=n,this._content=r,this._lineOffsets=null}return Object.defineProperty(FullTextDocument.prototype,"uri",{get:function(){return this._uri},enumerable:!0,configurable:!0}),Object.defineProperty(FullTextDocument.prototype,"languageId",{get:function(){return this._languageId},enumerable:!0,configurable:!0}),Object.defineProperty(FullTextDocument.prototype,"version",{get:function(){return this._version},enumerable:!0,configurable:!0}),FullTextDocument.prototype.getText=function(e){if(e){var t=this.offsetAt(e.start),n=this.offsetAt(e.end);return this._content.substring(t,n)}return this._content},FullTextDocument.prototype.update=function(e,t){this._content=e.text,this._version=t,this._lineOffsets=null},FullTextDocument.prototype.getLineOffsets=function(){if(null===this._lineOffsets){for(var e=[],t=this._content,n=!0,r=0;r<t.length;r++){n&&(e.push(r),n=!1);var i=t.charAt(r);n="\r"===i||"\n"===i,"\r"===i&&r+1<t.length&&"\n"===t.charAt(r+1)&&r++}n&&t.length>0&&e.push(t.length),this._lineOffsets=e}return this._lineOffsets},FullTextDocument.prototype.positionAt=function(e){e=Math.max(Math.min(e,this._content.length),0);var t=this.getLineOffsets(),n=0,r=t.length;if(0===r)return i.create(0,e);for(;n<r;){var o=Math.floor((n+r)/2);t[o]>e?r=o:n=o+1}var a=n-1;return i.create(a,e-t[a])},FullTextDocument.prototype.offsetAt=function(e){var t=this.getLineOffsets();if(e.line>=t.length)return this._content.length;if(e.line<0)return 0;var n=t[e.line],r=e.line+1<t.length?t[e.line+1]:this._content.length;return Math.max(Math.min(n+e.character,r),n)},Object.defineProperty(FullTextDocument.prototype,"lineCount",{get:function(){return this.getLineOffsets().length},enumerable:!0,configurable:!0}),FullTextDocument}();(function(e){function defined(e){return void 0!==e}function undefined(e){return void 0===e}function boolean(e){return!0===e||!1===e}function string(e){return"[object String]"===t.call(e)}function number(e){return"[object Number]"===t.call(e)}function func(e){return"[object Function]"===t.call(e)}function objectLiteral(e){return null!==e&&"object"===(void 0===e?"undefined":r(e))}function typedArray(e,t){return Array.isArray(e)&&e.every(t)}var t=Object.prototype.toString;e.defined=defined,e.undefined=undefined,e.boolean=boolean,e.string=string,e.number=number,e.func=func,e.objectLiteral=objectLiteral,e.typedArray=typedArray})(X||(X={}))}});