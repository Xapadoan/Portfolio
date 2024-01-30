import connection from './Database';

export interface ProjectAttributes {
  clientEmail: string;
  clientName: string;
  companyName: string;
  type: Record<string, boolean>;
  details: string;
}

export default class Project implements ProjectAttributes {
  public clientEmail: string;
  public clientName: string;
  public companyName: string;
  public type: Record<string, boolean>;
  public details: string;

  public constructor({
    clientEmail,
    clientName,
    companyName,
    type,
    details,
  }: ProjectAttributes) {
    this.clientEmail = clientEmail;
    this.clientName = clientName;
    this.companyName = companyName;
    this.type = type;
    this.details = details;
  }

  public async save() {
    return connection.query(
      'INSERT INTO projects (client_email, client_name, client_company, type, details) VALUES (?, ?, ?, ?, ?)',
      [
        this.clientEmail,
        this.clientName,
        this.companyName,
        Object.keys(this.type)
          .filter((key) => this.type[key] === true)
          .join(', '),
        this.details,
      ]
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static validate(object: any): object is ProjectAttributes {
    if (typeof object['clientEmail'] !== 'string') return false;
    if (typeof object['clientName'] !== 'string') return false;
    if (typeof object['companyName'] !== 'string') return false;
    if (typeof object['type'] !== 'object') return false;
    const isTypeWrong = Object.keys(object['type']).some(
      (key) => typeof object['type'][key] !== 'boolean'
    );
    if (isTypeWrong) return false;
    if (typeof object['details'] !== 'string') return false;
    return true;
  }
}
