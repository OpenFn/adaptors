type Mapping = {
  // mapping rules for a particular key
  // defaults, fn, etc
  defaults?: Record<string, any>;

  // Map some simple key in the input to an extension URL
  extension: string;
};

// Schema to describe a particular prop
type Schema = {
  id: string;
  type: string;
  isArray: boolean;
  defaults: Record<string, any>;
  /** True if this prop includes a system */
  hasSystem?: boolean;
};
