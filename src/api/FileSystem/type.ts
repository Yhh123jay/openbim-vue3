
interface HdfsLocatedFileStatus {
  path: string;
  isDirectory: boolean;
  modification_time: number;
  access_time: number;
  owner: string;
  group: string;
  permission: string;
  isSymlink: boolean;
  hasAcl: boolean;
  isEncrypted: boolean;
  isErasureCoded: boolean;
}
interface FilePath {
  name: string;
  parent:FilePath;
  absolute:boolean;
  root:boolean;
  uriPathAbsolute:boolean;
  absoluteAndSchemeAuthorityNull:boolean;
}

export interface PathInfoResult {
  fileStatus: HdfsLocatedFileStatus;
  filePath: FilePath;
}
