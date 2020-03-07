export enum Node {
  Null,
  Program,
  EOF,
  Function,
  FunctionCall,
  Assignement,
  Declaration,
  Operation,
  Operator,
  Comment,
  CommentBlock,
  Identifier,
  String,
  Number,
}

export interface BaseAST {
  type: Node.Program
  body: any[]
}

export interface EofNode {
  type: Node.EOF
}

export interface FuncDeclNode {
  type: Node.Function
  name: string
  args: string[]
  body: any[]
}

export interface FuncCallNode {
  type: Node.FunctionCall
  name: string
  args: string[]
}

export interface Assign {
  type: Node.Assignement
  name: string
  value: string | number
}

export interface Comment {
  type: Node.Comment
}

export interface CommentBlock {
  type: Node.CommentBlock
}
