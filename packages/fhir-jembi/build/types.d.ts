type Mapping = {
  // mapping rules for a particular key
  // defaults, fn, etc
  defaults?: Record<string, any>;
};

// Schema to describe a particular prop
type Schema = {
  id: string;
  type: string;
  isArray: boolean;
  defaults: Record<string, any>;
};
