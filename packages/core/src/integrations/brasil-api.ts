export interface BrasilApiCnpjResponse {
  cnpj: string;
  razao_social: string;
  nome_fantasia: string;
  cnae_fiscal_descricao: string;
  descricao_situacao_cadastral: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cep: string;
  municipio: string;
  uf: string;
  ddd_telefone_1: string;
}

export interface BrasilApiCepResponse {
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
}

export class BrasilApiService {
  /**
   * Consulta os dados cadastrais da empresa através do CNPJ na Brasil API
   */
  static async fetchCompanyByCNPJ(cnpj: string): Promise<{
    cnpj: string;
    legalName: string;
    tradeName: string;
    category: string;
    phone: string;
    zipCode: string;
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
  }> {
    const cleanCnpj = cnpj.replace(/\D/g, "");

    if (cleanCnpj.length !== 14) {
      throw new Error("CNPJ deve conter exatamente 14 dígitos.");
    }

    const res = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cleanCnpj}`, {
      headers: { "User-Agent": "Review14-SaaS" },
      ...({ next: { revalidate: 3600 } } as any),
    });

    if (!res.ok) {
      throw new Error(`CNPJ não localizado ou serviço indisponível (${res.status})`);
    }

    const data: BrasilApiCnpjResponse = await res.json();

    return {
      cnpj: cleanCnpj,
      legalName: data.razao_social || "",
      tradeName: data.nome_fantasia || data.razao_social || "",
      category: data.cnae_fiscal_descricao || "Comércio / Serviços",
      phone: data.ddd_telefone_1 ? `(${data.ddd_telefone_1.slice(0, 2)}) ${data.ddd_telefone_1.slice(2)}` : "",
      zipCode: data.cep || "",
      street: data.logradouro || "",
      number: data.numero || "",
      complement: data.complemento || "",
      neighborhood: data.bairro || "",
      city: data.municipio || "",
      state: data.uf || "",
    };
  }

  /**
   * Consulta o endereço automático pelo CEP na Brasil API
   */
  static async fetchAddressByCEP(cep: string): Promise<{
    zipCode: string;
    street: string;
    neighborhood: string;
    city: string;
    state: string;
  }> {
    const cleanCep = cep.replace(/\D/g, "");

    if (cleanCep.length !== 8) {
      throw new Error("CEP deve conter exatamente 8 dígitos.");
    }

    const res = await fetch(`https://brasilapi.com.br/api/cep/v2/${cleanCep}`, {
      headers: { "User-Agent": "Review14-SaaS" },
    });

    if (!res.ok) {
      throw new Error("CEP não encontrado.");
    }

    const data: BrasilApiCepResponse = await res.json();

    return {
      zipCode: cleanCep,
      street: data.street || "",
      neighborhood: data.neighborhood || "",
      city: data.city || "",
      state: data.state || "",
    };
  }
}
