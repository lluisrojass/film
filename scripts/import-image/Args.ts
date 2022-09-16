enum ARGS {
  INPUT = '--input',
  VERBOSE = '--verbose',
};

class Args {
  private args: Record<ARGS, boolean> = {
    [ARGS.INPUT]: true,
    [ARGS.VERBOSE]: false
  };

  private values: Record<string, string> = {};

  constructor(argv: string[]) {
    this.extractArgs(argv);
    this.validateArgState();
  }

  private extractArgs(argv: string[]) {
    for (let i = 0; i < argv.length - 1 ; i += 1) {
      const arg = argv[i];
      const nextArg = argv[i + 1];

      if (!(arg in this.args)) continue;
      if (!nextArg) continue;
      if (nextArg in this.args) continue; 

      this.values[arg] = nextArg;
    }
  }

  private validateArgState() {
    Object.keys(this.args).forEach(arg => {
      const value = this.values[arg];

      if (!this.args[arg as ARGS]) 
        return;
      if (!value) 
        throw new Error(`Invalid State, missing required argument \`${arg}\``);
      if (arg === ARGS.INPUT && !value.toLowerCase().endsWith('tif')) 
        throw new Error(`Argument \`${arg}\` must be a reference to a .tif image`);
    });
  }

  public getInput(): string {
    return this.values[ARGS.INPUT];
  }

  public getVerbose(): string | undefined {
    return this.values[ARGS.VERBOSE];
  }
}

export default Args;