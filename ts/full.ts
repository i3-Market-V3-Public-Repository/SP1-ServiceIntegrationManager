import {api, operation, param, requestBody} from '@loopback/rest';
import {DataProvider} from '../../models';
import {CategoriesList} from '../../models';
import {DataOffering} from '../../models';
import {DataOfferingId} from '../../models';
import {DataOfferingDto} from '../../models';
import {Offerings} from '../../models';
import {ContractsParametersForOfferings} from '../../models';
import {OfferingsList} from '../../models';
import {ProvidersList} from '../../models';

/**
 * The controller class is generated from OpenAPI spec with operations tagged
 * by registration-offering.
 *
 * Registration Offering
 */
@api({
    components: {
        schemas: {
            IntNumber: {
                type: 'number',
                properties: {
                    i: {
                        type: 'number',
                    },
                },
                title: 'IntNumber',
            },
            CategoriesList: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                    },
                    description: {
                        type: 'string',
                    },
                },
                title: 'CategoriesList',
            },
            DataOfferingId: {
                type: 'object',
                properties: {
                    dataOfferingId: {
                        type: 'string',
                    },
                },
                title: 'DataOfferingId',
            },
            DataOffering: {
                type: 'object',
                properties: {
                    provider: {
                        type: 'string',
                        example: 'mandatory_field',
                    },
                    marketId: {
                        type: 'string',
                    },
                    owner: {
                        type: 'string',
                    },
                    dataOfferingTitle: {
                        type: 'string',
                        example: 'mandatory_field',
                    },
                    dataOfferingDescription: {
                        type: 'string',
                    },
                    category: {
                        type: 'string',
                        example: 'Other',
                    },
                    status: {
                        type: 'string',
                        example: 'e.g. Activated, InActivated, ToBeDeleted, Deleted',
                    },
                    dataOfferingExpirationTime: {
                        type: 'string',
                        example: 'NA',
                    },
                    contractParameters: {
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/ContractParameters',
                        },
                    },
                    hasPricingModel: {
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/PricingModel',
                        },
                    },
                    hasDataset: {
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/Dataset',
                        },
                    },
                },
                title: 'DataOffering',
            },
            ContractParameters: {
                type: 'object',
                properties: {
                    contractParametersId: {
                        type: 'string',
                    },
                    interestOfProvider: {
                        type: 'string',
                        example: 'NA',
                    },
                    interestDescription: {
                        type: 'string',
                        example: 'NA',
                    },
                    hasGoverningJurisdiction: {
                        type: 'string',
                        example: 'NA',
                    },
                    purpose: {
                        type: 'string',
                        example: 'NA',
                    },
                    purposeDescription: {
                        type: 'string',
                        example: 'NA',
                    },
                    hasIntendedUse: {
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/IntendedUse',
                        },
                    },
                    hasLicenseGrant: {
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/LicenseGrant',
                        },
                    },
                },
            },
            ContractsParametersForOfferings: {
                type: 'object',
                properties: {
                    dataOfferingId: {
                        type: 'string',
                    },
                    provider: {
                        type: 'string',
                        example: 'NA',
                    },
                    category: {
                        type: 'string',
                        example: 'NA',
                    },
                    contractParameters: {
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/ContractParameters',
                        },
                    },
                },
            },
            IntendedUse: {
                type: 'object',
                properties: {
                    intendedUseId: {
                        type: 'string',
                    },
                    processData: {
                        type: 'string',
                        example: 'true OR false',
                    },
                    shareDataWithThirdParty: {
                        type: 'string',
                        example: 'true OR false',
                    },
                    editData: {
                        type: 'string',
                        example: 'true OR false',
                    },
                },
                title: 'IntendedUse',
            },
            LicenseGrant: {
                type: 'object',
                properties: {
                    licenseGrantId: {
                        type: 'string',
                    },
                    copyData: {
                        type: 'string',
                        example: 'true OR false',
                    },
                    transferable: {
                        type: 'string',
                        example: 'true OR false',
                    },
                    exclusiveness: {
                        type: 'string',
                        example: 'true OR false',
                    },
                    revocable: {
                        type: 'string',
                        example: 'true OR false',
                    },
                },
                title: 'LicenseGrant',
            },
            DataProvider: {
                type: 'object',
                required: [
                    'name',
                    'providerId',
                ],
                properties: {
                    providerId: {
                        type: 'string',
                    },
                    name: {
                        type: 'string',
                    },
                    description: {
                        type: 'string',
                    },
                    organization: {
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/Organization',
                        },
                    },
                },
                title: 'DataProvider',
            },
            PricingModel: {
                type: 'object',
                required: [
                    'hasPaymentOnSubscription',
                    'hasPaymentOnApi',
                    'hasPaymentOnUnit',
                    'hasPaymentOnSize',
                    'hasFreePrice',
                ],
                properties: {
                    pricingModelId: {
                        type: 'string',
                    },
                    pricingModelName: {
                        type: 'string',
                        example: 'mandatory_field',
                    },
                    basicPrice: {
                        type: 'string',
                        example: 'mandatory_field',
                    },
                    currency: {
                        type: 'string',
                        example: 'mandatory_field',
                    },
                    hasPaymentOnSubscription: {
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/PaymentOnSubscription',
                        },
                    },
                    hasPaymentOnApi: {
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/PaymentOnApi',
                        },
                    },
                    hasPaymentOnUnit: {
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/PaymentOnUnit',
                        },
                    },
                    hasPaymentOnSize: {
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/PaymentOnSize',
                        },
                    },
                    hasFreePrice: {
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/PaymentOnFreePrice',
                        },
                    },
                },
                title: 'PricingModel',
            },
            PaymentOnSubscription: {
                type: 'object',
                properties: {
                    paymentId: {
                        type: 'string',
                    },
                    paymentOnSubscriptionName: {
                        type: 'string',
                        example: 'optional_field',
                    },
                    paymentType: {
                        type: 'string',
                        example: 'optional_field',
                    },
                    timeDuration: {
                        type: 'string',
                        example: 'optional_field',
                    },
                    description: {
                        type: 'string',
                        example: 'optional_field',
                    },
                    repeat: {
                        type: 'string',
                        example: 'Daily',
                    },
                    hasSubscriptionPrice: {
                        type: 'string',
                        example: 'optional_field',
                    },
                },
                title: 'PaymentOnSubscription',
            },
            PaymentOnPlan: {
                type: 'object',
                properties: {
                    paymentId: {
                        type: 'string',
                    },
                    paymentOnPlanName: {
                        type: 'string',
                        example: 'optional_field',
                    },
                    description: {
                        type: 'string',
                        example: 'optional_field',
                    },
                    planDuration: {
                        type: 'string',
                        example: 'optional_field',
                    },
                    hasPlanPrice: {
                        type: 'string',
                        example: 'optional_field',
                    },
                },
                title: 'PaymentOnPlan',
            },
            PaymentOnApi: {
                type: 'object',
                properties: {
                    paymentId: {
                        type: 'string',
                    },
                    paymentOnApiName: {
                        type: 'string',
                        example: 'optional_field',
                    },
                    description: {
                        type: 'string',
                        example: 'optional_field',
                    },
                    numberOfObject: {
                        type: 'string',
                        example: 'optional_field',
                    },
                    hasApiPrice: {
                        type: 'string',
                        example: 'optional_field',
                    },
                },
                title: 'PaymentOnApi',
            },
            PaymentOnUnit: {
                type: 'object',
                properties: {
                    paymentId: {
                        type: 'string',
                    },
                    paymentOnUnitName: {
                        type: 'string',
                        example: 'optional_field',
                    },
                    description: {
                        type: 'string',
                        example: 'optional_field',
                    },
                    dataUnit: {
                        type: 'string',
                        example: 'optional_field',
                    },
                    hasUnitPrice: {
                        type: 'string',
                        example: 'optional_field',
                    },
                },
                title: 'PaymentOnUnit',
            },
            PaymentOnSize: {
                type: 'object',
                properties: {
                    paymentId: {
                        type: 'string',
                    },
                    paymentOnSizeName: {
                        type: 'string',
                        example: 'optional_field',
                    },
                    description: {
                        type: 'string',
                        example: 'optional_field',
                    },
                    dataSize: {
                        type: 'string',
                        example: 'optional_field',
                    },
                    hasSizePrice: {
                        type: 'string',
                        example: 'optional_field',
                    },
                },
                title: 'PaymentOnSize',
            },
            PaymentOnFreePrice: {
                type: 'object',
                properties: {
                    paymentId: {
                        type: 'string',
                    },
                    hasPriceFree: {
                        type: 'string',
                        example: 'optional_field',
                    },
                },
                title: 'PaymentOnFreePrice',
            },
            Dataset: {
                type: 'object',
                required: [
                    'datasetInformation',
                    'distribution',
                ],
                properties: {
                    datasetId: {
                        type: 'string',
                    },
                    title: {
                        type: 'string',
                        example: 'mandatory_field',
                    },
                    keyword: {
                        type: 'string',
                        example: 'mandatory_field',
                    },
                    dataset: {
                        type: 'string',
                        example: 'optional_field',
                    },
                    description: {
                        type: 'string',
                        example: 'optional_field',
                    },
                    issued: {
                        type: 'string',
                        example: 'date-time',
                    },
                    modified: {
                        type: 'string',
                        example: 'date-time',
                    },
                    temporal: {
                        type: 'string',
                        example: 'optional_field',
                    },
                    language: {
                        type: 'string',
                        example: 'optional_field',
                    },
                    spatial: {
                        type: 'string',
                        example: 'optional_field',
                    },
                    accrualPeriodicity: {
                        type: 'string',
                        example: 'optional_field',
                    },
                    temporalResolution: {
                        type: 'string',
                        example: 'optional_field',
                    },
                    distribution: {
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/Distribution',
                        },
                    },
                    datasetInformation: {
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/DatasetInformation',
                        },
                    },
                    theme: {
                        type: 'array',
                        items: {
                            type: 'string',
                            example: 'optional_field',
                        },
                    },
                },
                title: 'Dataset',
            },
            Distribution: {
                type: 'object',
                required: [
                    'accessService',
                ],
                properties: {
                    distributionId: {
                        type: 'string',
                    },
                    title: {
                        type: 'string',
                        example: 'optional_field',
                    },
                    description: {
                        type: 'string',
                        example: 'optional_field',
                    },
                    license: {
                        type: 'string',
                        example: 'optional_field',
                    },
                    accessRights: {
                        type: 'string',
                        example: 'optional_field',
                    },
                    downloadType: {
                        type: 'string',
                        example: 'optional_field',
                    },
                    conformsTo: {
                        type: 'string',
                        example: 'optional_field',
                    },
                    mediaType: {
                        type: 'string',
                        example: 'optional_field',
                    },
                    packageFormat: {
                        type: 'string',
                        example: 'optional_field',
                    },
                    accessService: {
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/AccessService',
                        },
                    },
                },
                title: 'Distribution',
            },
            AccessService: {
                type: 'object',
                properties: {
                    dataserviceId: {
                        type: 'string',
                    },
                    conformsTo: {
                        type: 'string',
                        example: 'optional_field',
                    },
                    endpointDescription: {
                        type: 'string',
                        example: 'optional_field',
                    },
                    endpointURL: {
                        type: 'string',
                        example: 'optional_field',
                    },
                    servesDataset: {
                        type: 'string',
                        example: 'optional_field',
                    },
                    serviceSpecs: {
                        type: 'string',
                        example: 'optional_field',
                    },
                },
                title: 'AccessService',
            },
            DatasetInformation: {
                type: 'object',
                properties: {
                    datasetInformationId: {
                        type: 'string',
                    },
                    measurementType: {
                        type: 'string',
                        example: 'optional_field',
                    },
                    measurementChannelType: {
                        type: 'string',
                        example: 'optional_field',
                    },
                    sensorId: {
                        type: 'string',
                        example: 'optional_field',
                    },
                    deviceId: {
                        type: 'string',
                        example: 'optional_field',
                    },
                    cppType: {
                        type: 'string',
                        example: 'optional_field',
                    },
                    sensorType: {
                        type: 'string',
                        example: 'optional_field',
                    },
                },
                title: 'DatasetInformation',
            },
            OfferingsList: {
                type: 'object',
                properties: {
                    offering: {
                        type: 'string',
                        example: 'example_dataoffering1',
                    },
                },
                title: 'OfferingsList',
            },
            Organization: {
                type: 'object',
                required: [
                    'name',
                    'organizationId',
                ],
                properties: {
                    organizationId: {
                        type: 'string',
                    },
                    name: {
                        type: 'string',
                        example: 'optional_field',
                    },
                    description: {
                        type: 'string',
                        example: 'optional_field',
                    },
                    address: {
                        type: 'string',
                        example: 'optional_field',
                    },
                    contactPoint: {
                        type: 'string',
                        example: 'optional_field',
                    },
                },
                title: 'Organization',
            },
            ProvidersList: {
                type: 'object',
                properties: {
                    providerId: {
                        type: 'string',
                    },
                },
                title: 'ProvidersList',
            },
            Offerings: {
                type: 'object',
                properties: {
                    totalOffering: {
                        type: 'number',
                    },
                    result: {
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/DataOfferingDto',
                        },
                    },
                },
                title: 'Offerings',
            },
            DataOfferingDto: {
                type: 'object',
                required: [
                    'hasDataset',
                    'hasPricingModel',
                    'provider',
                    'contractParameters',
                ],
                properties: {
                    dataOfferingId: {
                        type: 'string',
                    },
                    provider: {
                        type: 'string',
                    },
                    marketId: {
                        type: 'string',
                    },
                    owner: {
                        type: 'string',
                    },
                    dataOfferingTitle: {
                        type: 'string',
                    },
                    dataOfferingDescription: {
                        type: 'string',
                    },
                    category: {
                        type: 'string',
                    },
                    status: {
                        type: 'string',
                        example: 'activated, inactivated, deleted',
                    },
                    version: {
                        type: 'number',
                    },
                    dataOfferingExpirationTime: {
                        type: 'string',
                    },
                    dataOfferingCreated: {
                        type: 'string',
                    },
                    lastModified: {
                        type: 'string',
                    },
                    contractParameters: {
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/ContractParameters',
                        },
                    },
                    hasPricingModel: {
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/PricingModel',
                        },
                    },
                    hasDataset: {
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/Dataset',
                        },
                    },
                },
                title: 'DataOfferingDto',
            },
        },
    },
    paths: {},
})
export class Full {
    constructor() {
    }

    /**
     *
     *
     * @param _requestBody dataProviderTemplate
     */
    @operation('post', '/api/registration', {
        tags: [
            'registration-offering',
        ],
        summary: 'register provider info',
        operationId: 'saveDataProviderUsingPOST',
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/DataProvider',
                    },
                },
            },
            description: 'dataProviderTemplate',
            required: true,
        },
        responses: {
            '200': {
                description: 'OK',
            },
            '201': {
                description: 'Created',
            },
            '400': {
                description: 'failed to save provider information',
            },
            '401': {
                description: 'Unauthorized',
            },
            '403': {
                description: 'Forbidden',
            },
            '404': {
                description: 'Not Found',
            },
        },
        deprecated: false,
    })
    async saveDataProviderUsingPost(@requestBody({
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/DataProvider',
                },
            },
        },
        description: 'dataProviderTemplate',
        required: true,
    }) _requestBody: DataProvider): Promise<unknown> {
        throw new Error('Not implemented');
    }

    /**
     *
     *
     * @param page Page number of the requested page
     * @param size Size of a page
     * @param sort Sorting criteria in the format: property(,asc|desc). Default
     sort order is ascending. Multiple sort criteria are supported.
     * @returns OK
     */
    @operation('get', '/api/registration/categories-list', {
        tags: [
            'registration-offering',
        ],
        summary: 'get a list of all categories',
        operationId: 'getCategoriesListUsingGET',
        parameters: [
            {
                name: 'page',
                in: 'query',
                description: 'Page number of the requested page',
                required: false,
                schema: {
                    type: 'integer',
                    format: 'int32',
                },
            },
            {
                name: 'size',
                in: 'query',
                description: 'Size of a page',
                required: false,
                schema: {
                    type: 'integer',
                    format: 'int32',
                },
            },
            {
                name: 'sort',
                in: 'query',
                description: 'Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.',
                required: false,
                explode: true,
                schema: {
                    type: 'array',
                    items: {
                        type: 'string',
                    },
                },
            },
        ],
        responses: {
            '200': {
                description: 'OK',
                content: {
                    '*/*': {
                        schema: {
                            type: 'array',
                            items: {
                                $ref: '#/components/schemas/CategoriesList',
                            },
                        },
                    },
                },
            },
            '401': {
                description: 'Unauthorized',
            },
            '403': {
                description: 'Forbidden',
            },
            '404': {
                description: 'failed to get list of categories',
            },
        },
        deprecated: false,
    })
    async getCategoriesListUsingGet(@param({
        name: 'page',
        in: 'query',
        description: 'Page number of the requested page',
        required: false,
        schema: {
            type: 'integer',
            format: 'int32',
        },
    }) page: number | undefined, @param({
        name: 'size',
        in: 'query',
        description: 'Size of a page',
        required: false,
        schema: {
            type: 'integer',
            format: 'int32',
        },
    }) size: number | undefined, @param({
        name: 'sort',
        in: 'query',
        description: 'Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.',
        required: false,
        explode: true,
        schema: {
            type: 'array',
            items: {
                type: 'string',
            },
        },
    }) sort: string[] | undefined): Promise<CategoriesList[]> {
        throw new Error('Not implemented');
    }

    /**
     *
     *
     * @param _requestBody dataOffering
     * @returns OK
     */
    @operation('post', '/api/registration/data-offering', {
        tags: [
            'registration-offering',
        ],
        summary: 'register a data offering',
        operationId: 'dataOfferingUsingPOST',
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/DataOffering',
                    },
                },
            },
            description: 'dataOffering',
            required: true,
        },
        responses: {
            '200': {
                description: 'OK',
                content: {
                    '*/*': {
                        schema: {
                            type: 'array',
                            items: {
                                $ref: '#/components/schemas/DataOfferingId',
                            },
                        },
                    },
                },
            },
            '201': {
                description: 'Created',
            },
            '400': {
                description: 'failed to save offerings',
            },
            '401': {
                description: 'Unauthorized',
            },
            '403': {
                description: 'Forbidden',
            },
            '404': {
                description: 'Not Found',
            },
        },
        deprecated: false,
    })
    async dataOfferingUsingPost(@requestBody({
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/DataOffering',
                },
            },
        },
        description: 'dataOffering',
        required: true,
    }) _requestBody: DataOffering): Promise<DataOfferingId[]> {
        throw new Error('Not implemented');
    }

    /**
     *
     *
     * @param id id
     */
    @operation('delete', '/api/registration/delete-offering/{id}', {
        tags: [
            'registration-offering',
        ],
        summary: 'delete a data offering',
        operationId: 'deleteOfferingUsingDELETE',
        parameters: [
            {
                name: 'id',
                in: 'path',
                description: 'id',
                required: true,
                schema: {
                    type: 'string',
                },
            },
        ],
        responses: {
            '200': {
                description: 'OK',
            },
            '204': {
                description: 'No Content',
            },
            '400': {
                description: 'failed to delete an offerings by id',
            },
            '401': {
                description: 'Unauthorized',
            },
            '403': {
                description: 'Forbidden',
            },
        },
        deprecated: false,
    })
    async deleteOfferingUsingDelete(@param({
        name: 'id',
        in: 'path',
        description: 'id',
        required: true,
        schema: {
            type: 'string',
        },
    }) id: string): Promise<unknown> {
        throw new Error('Not implemented');
    }

    /**
     *
     *
     * @returns OK
     */
    @operation('get', '/api/registration/offering/offering-template', {
        tags: [
            'registration-offering',
        ],
        summary: 'download offering template',
        operationId: 'getOfferingTemplateUsingGET',
        responses: {
            '200': {
                description: 'OK',
                content: {
                    '*/*': {
                        schema: {
                            type: 'string',
                        },
                    },
                },
            },
            '400': {
                description: 'internal server error to create template',
            },
            '401': {
                description: 'Unauthorized',
            },
            '403': {
                description: 'Forbidden',
            },
            '404': {
                description: 'Not Found',
            },
        },
        deprecated: false,
    })
    async getOfferingTemplateUsingGet(): Promise<string> {
        throw new Error('Not implemented');
    }

    /**
     *
     *
     * @param category category
     * @param page Page number of the requested page
     * @param size Size of a page
     * @param sort Sorting criteria in the format: property(,asc|desc). Default
     sort order is ascending. Multiple sort criteria are supported.
     * @returns OK
     */
    @operation('get', '/api/registration/offering/{category}', {
        tags: [
            'registration-offering',
        ],
        summary: 'get a registered data offerings by category',
        operationId: 'getAllRegisteredOfferingsByCategoryUsingGET',
        parameters: [
            {
                name: 'category',
                in: 'path',
                description: 'category',
                required: true,
                schema: {
                    type: 'string',
                },
            },
            {
                name: 'page',
                in: 'query',
                description: 'Page number of the requested page',
                required: false,
                schema: {
                    type: 'integer',
                    format: 'int32',
                },
            },
            {
                name: 'size',
                in: 'query',
                description: 'Size of a page',
                required: false,
                schema: {
                    type: 'integer',
                    format: 'int32',
                },
            },
            {
                name: 'sort',
                in: 'query',
                description: 'Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.',
                required: false,
                explode: true,
                schema: {
                    type: 'array',
                    items: {
                        type: 'string',
                    },
                },
            },
        ],
        responses: {
            '200': {
                description: 'OK',
                content: {
                    '*/*': {
                        schema: {
                            type: 'array',
                            items: {
                                $ref: '#/components/schemas/DataOfferingDto',
                            },
                        },
                    },
                },
            },
            '400': {
                description: 'failed to get offerings by category',
            },
            '401': {
                description: 'Unauthorized',
            },
            '403': {
                description: 'Forbidden',
            },
            '404': {
                description: 'Not Found',
            },
        },
        deprecated: false,
    })
    async getAllRegisteredOfferingsByCategoryUsingGet(@param({
        name: 'category',
        in: 'path',
        description: 'category',
        required: true,
        schema: {
            type: 'string',
        },
    }) category: string, @param({
        name: 'page',
        in: 'query',
        description: 'Page number of the requested page',
        required: false,
        schema: {
            type: 'integer',
            format: 'int32',
        },
    }) page: number | undefined, @param({
        name: 'size',
        in: 'query',
        description: 'Size of a page',
        required: false,
        schema: {
            type: 'integer',
            format: 'int32',
        },
    }) size: number | undefined, @param({
        name: 'sort',
        in: 'query',
        description: 'Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.',
        required: false,
        explode: true,
        schema: {
            type: 'array',
            items: {
                type: 'string',
            },
        },
    }) sort: string[] | undefined): Promise<DataOfferingDto[]> {
        throw new Error('Not implemented');
    }

    /**
     *
     *
     * @param providerId providerId
     * @returns OK
     */
    @operation('get', '/api/registration/offering/provider/{providerId}', {
        tags: [
            'registration-offering',
        ],
        summary: 'Get data provider by providerId',
        operationId: 'getDataProviderByProviderIdUsingGET',
        parameters: [
            {
                name: 'providerId',
                in: 'path',
                description: 'providerId',
                required: true,
                schema: {
                    type: 'string',
                },
            },
        ],
        responses: {
            '200': {
                description: 'OK',
                content: {
                    '*/*': {
                        schema: {
                            type: 'array',
                            items: {
                                $ref: '#/components/schemas/DataProvider',
                            },
                        },
                    },
                },
            },
            '400': {
                description: 'failed to get dataProvider by category',
            },
            '401': {
                description: 'Unauthorized',
            },
            '403': {
                description: 'Forbidden',
            },
            '404': {
                description: 'Not Found',
            },
        },
        deprecated: false,
    })
    async getDataProviderByProviderIdUsingGet(@param({
        name: 'providerId',
        in: 'path',
        description: 'providerId',
        required: true,
        schema: {
            type: 'string',
        },
    }) providerId: string): Promise<DataProvider[]> {
        throw new Error('Not implemented');
    }

    /**
     *
     *
     * @param providerId providerId
     */
    @operation('delete', '/api/registration/provider/{providerId}/delete', {
        tags: [
            'registration-offering',
        ],
        summary: 'delete a data provider by providerId',
        operationId: 'deleteProviderByProviderIdUsingDELETE',
        parameters: [
            {
                name: 'providerId',
                in: 'path',
                description: 'providerId',
                required: true,
                schema: {
                    type: 'string',
                },
            },
        ],
        responses: {
            '200': {
                description: 'OK',
            },
            '204': {
                description: 'No Content',
            },
            '400': {
                description: 'failed to delete an offerings by id',
            },
            '401': {
                description: 'Unauthorized',
            },
            '403': {
                description: 'Forbidden',
            },
        },
        deprecated: false,
    })
    async deleteProviderByProviderIdUsingDelete(@param({
        name: 'providerId',
        in: 'path',
        description: 'providerId',
        required: true,
        schema: {
            type: 'string',
        },
    }) providerId: string): Promise<unknown> {
        throw new Error('Not implemented');
    }

    /**
     *
     *
     * @param providerId providerId
     * @param category category
     * @param page Page number of the requested page
     * @param size Size of a page
     * @param orderBy Order by Time/Title. Default is time.
     * @param sortBy Sorting criteria in the format: property(,asc|desc). Default
     sort order is decending
     * @returns OK
     */
    @operation('get', '/api/registration/offerings', {
        tags: [
            'registration-offering',
        ],
        summary: 'get total offering and its list',
        operationId: 'getTotalOfferingAndOfferingListUsingGET',
        parameters: [
            {
                name: 'providerId',
                in: 'query',
                description: 'providerId',
                required: false,
                schema: {
                    type: 'string',
                },
            },
            {
                name: 'category',
                in: 'query',
                description: 'category',
                required: false,
                schema: {
                    type: 'string',
                },
            },
            {
                name: 'page',
                in: 'query',
                description: 'Page number of the requested page',
                required: false,
                schema: {
                    type: 'integer',
                    format: 'int32',
                },
            },
            {
                name: 'size',
                in: 'query',
                description: 'Size of a page',
                required: false,
                schema: {
                    type: 'integer',
                    format: 'int32',
                },
            },
            {
                name: 'orderBy',
                in: 'query',
                description: 'Order by Time/Title. Default is time.',
                required: false,
                schema: {
                    type: 'string',
                    default: 'time',
                },
            },
            {
                name: 'sortBy',
                in: 'query',
                description: 'Sorting criteria in the format: property(,asc|desc). Default sort order is decending',
                required: false,
                schema: {
                    type: 'string',
                    default: 'desc',
                },
            },
        ],
        responses: {
            '200': {
                description: 'OK',
                content: {
                    '*/*': {
                        schema: {
                            type: 'array',
                            items: {
                                $ref: '#/components/schemas/Offerings',
                            },
                        },
                    },
                },
            },
            '400': {
                description: 'failed to get offerings by category',
            },
            '401': {
                description: 'Unauthorized',
            },
            '403': {
                description: 'Forbidden',
            },
            '404': {
                description: 'Not Found',
            },
        },
        deprecated: false,
    })
    async getTotalOfferingAndOfferingListUsingGet(@param({
        name: 'providerId',
        in: 'query',
        description: 'providerId',
        required: false,
        schema: {
            type: 'string',
        },
    }) providerId: string | undefined, @param({
        name: 'category',
        in: 'query',
        description: 'category',
        required: false,
        schema: {
            type: 'string',
        },
    }) category: string | undefined, @param({
        name: 'page',
        in: 'query',
        description: 'Page number of the requested page',
        required: false,
        schema: {
            type: 'integer',
            format: 'int32',
        },
    }) page: number | undefined, @param({
        name: 'size',
        in: 'query',
        description: 'Size of a page',
        required: false,
        schema: {
            type: 'integer',
            format: 'int32',
        },
    }) size: number | undefined, @param({
        name: 'orderBy',
        in: 'query',
        description: 'Order by Time/Title. Default is time.',
        required: false,
        schema: {
            type: 'string',
            default: 'time',
        },
    }) orderBy: string | undefined, @param({
        name: 'sortBy',
        in: 'query',
        description: 'Sorting criteria in the format: property(,asc|desc). Default sort order is decending',
        required: false,
        schema: {
            type: 'string',
            default: 'desc',
        },
    }) sortBy: string | undefined): Promise<Offerings[]> {
        throw new Error('Not implemented');
    }

    /**
     *
     *
     * @param id id
     * @param page Page number of the requested page
     * @param size Size of a page
     * @param sort Sorting criteria in the format: property(,asc|desc). Default
     sort order is ascending. Multiple sort criteria are supported.
     * @returns OK
     */
    @operation('get', '/api/registration/offering/{id}/offeringId', {
        tags: [
            'registration-offering',
        ],
        summary: 'get a registered data offering by offering id',
        operationId: 'getRegisteredOfferingUsingGET',
        parameters: [
            {
                name: 'id',
                in: 'path',
                description: 'id',
                required: true,
                schema: {
                    type: 'string',
                },
            },
            {
                name: 'page',
                in: 'query',
                description: 'Page number of the requested page',
                required: false,
                schema: {
                    type: 'integer',
                    format: 'int32',
                },
            },
            {
                name: 'size',
                in: 'query',
                description: 'Size of a page',
                required: false,
                schema: {
                    type: 'integer',
                    format: 'int32',
                },
            },
            {
                name: 'sort',
                in: 'query',
                description: 'Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.',
                required: false,
                explode: true,
                schema: {
                    type: 'array',
                    items: {
                        type: 'string',
                    },
                },
            },
        ],
        responses: {
            '200': {
                description: 'OK',
                content: {
                    '*/*': {
                        schema: {
                            type: 'array',
                            items: {
                                $ref: '#/components/schemas/DataOfferingDto',
                            },
                        },
                    },
                },
            },
            '400': {
                description: 'failed to get offerings by offering id',
            },
            '401': {
                description: 'Unauthorized',
            },
            '403': {
                description: 'Forbidden',
            },
            '404': {
                description: 'Not Found',
            },
        },
        deprecated: false,
    })
    async getRegisteredOfferingUsingGet(@param({
        name: 'id',
        in: 'path',
        description: 'id',
        required: true,
        schema: {
            type: 'string',
        },
    }) id: string, @param({
        name: 'page',
        in: 'query',
        description: 'Page number of the requested page',
        required: false,
        schema: {
            type: 'integer',
            format: 'int32',
        },
    }) page: number | undefined, @param({
        name: 'size',
        in: 'query',
        description: 'Size of a page',
        required: false,
        schema: {
            type: 'integer',
            format: 'int32',
        },
    }) size: number | undefined, @param({
        name: 'sort',
        in: 'query',
        description: 'Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.',
        required: false,
        explode: true,
        schema: {
            type: 'array',
            items: {
                type: 'string',
            },
        },
    }) sort: string[] | undefined): Promise<DataOfferingDto[]> {
        throw new Error('Not implemented');
    }

    /**
     *
     *
     * @param id id
     * @param page Page number of the requested page
     * @param size Size of a page
     * @param sort Sorting criteria in the format: property(,asc|desc). Default
     sort order is ascending. Multiple sort criteria are supported.
     * @returns OK
     */
    @operation('get', '/api/registration/offering/{id}/providerId', {
        tags: [
            'registration-offering',
        ],
        summary: 'get a registered data offering by provider id',
        operationId: 'getAllRegisteredOfferingsUsingGET',
        parameters: [
            {
                name: 'id',
                in: 'path',
                description: 'id',
                required: true,
                schema: {
                    type: 'string',
                },
            },
            {
                name: 'page',
                in: 'query',
                description: 'Page number of the requested page',
                required: false,
                schema: {
                    type: 'integer',
                    format: 'int32',
                },
            },
            {
                name: 'size',
                in: 'query',
                description: 'Size of a page',
                required: false,
                schema: {
                    type: 'integer',
                    format: 'int32',
                },
            },
            {
                name: 'sort',
                in: 'query',
                description: 'Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.',
                required: false,
                explode: true,
                schema: {
                    type: 'array',
                    items: {
                        type: 'string',
                    },
                },
            },
        ],
        responses: {
            '200': {
                description: 'OK',
                content: {
                    '*/*': {
                        schema: {
                            type: 'array',
                            items: {
                                $ref: '#/components/schemas/DataOfferingDto',
                            },
                        },
                    },
                },
            },
            '400': {
                description: 'failed to get offerings by provider id',
            },
            '401': {
                description: 'Unauthorized',
            },
            '403': {
                description: 'Forbidden',
            },
            '404': {
                description: 'Not Found',
            },
        },
        deprecated: false,
    })
    async getAllRegisteredOfferingsUsingGet(@param({
        name: 'id',
        in: 'path',
        description: 'id',
        required: true,
        schema: {
            type: 'string',
        },
    }) id: string, @param({
        name: 'page',
        in: 'query',
        description: 'Page number of the requested page',
        required: false,
        schema: {
            type: 'integer',
            format: 'int32',
        },
    }) page: number | undefined, @param({
        name: 'size',
        in: 'query',
        description: 'Size of a page',
        required: false,
        schema: {
            type: 'integer',
            format: 'int32',
        },
    }) size: number | undefined, @param({
        name: 'sort',
        in: 'query',
        description: 'Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.',
        required: false,
        explode: true,
        schema: {
            type: 'array',
            items: {
                type: 'string',
            },
        },
    }) sort: string[] | undefined): Promise<DataOfferingDto[]> {
        throw new Error('Not implemented');
    }

    /**
     *
     *
     * @param offeringId offeringId
     * @param page Page number of the requested page
     * @param size Size of a page
     * @param sort Sorting criteria in the format: property(,asc|desc). Default
     sort order is ascending. Multiple sort criteria are supported.
     * @returns OK
     */
    @operation('get', '/api/registration/contract-parameter/{offeringId}/offeringId', {
        tags: [
            'registration-offering',
        ],
        summary: 'get contract parameters by offering id',
        operationId: 'getOfferingContractsByOfferingIdUsingGET',
        parameters: [
            {
                name: 'offeringId',
                in: 'path',
                description: 'offeringId',
                required: true,
                schema: {
                    type: 'string',
                },
            },
            {
                name: 'page',
                in: 'query',
                description: 'Page number of the requested page',
                required: false,
                schema: {
                    type: 'integer',
                    format: 'int32',
                },
            },
            {
                name: 'size',
                in: 'query',
                description: 'Size of a page',
                required: false,
                schema: {
                    type: 'integer',
                    format: 'int32',
                },
            },
            {
                name: 'sort',
                in: 'query',
                description: 'Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.',
                required: false,
                explode: true,
                schema: {
                    type: 'array',
                    items: {
                        type: 'string',
                    },
                },
            },
        ],
        responses: {
            '200': {
                description: 'OK',
                content: {
                    '*/*': {
                        schema: {
                            type: 'array',
                            items: {
                                $ref: '#/components/schemas/ContractsParametersForOfferings',
                            },
                        },
                    },
                },
            },
            '400': {
                description: 'failed to get contract by offeringId',
            },
            '401': {
                description: 'Unauthorized',
            },
            '403': {
                description: 'Forbidden',
            },
            '404': {
                description: 'Not Found',
            },
        },
        deprecated: false,
    })
    async getOfferingContractsByOfferingIdUsingGet(@param({
        name: 'offeringId',
        in: 'path',
        description: 'offeringId',
        required: true,
        schema: {
            type: 'string',
        },
    }) offeringId: string, @param({
        name: 'page',
        in: 'query',
        description: 'Page number of the requested page',
        required: false,
        schema: {
            type: 'integer',
            format: 'int32',
        },
    }) page: number | undefined, @param({
        name: 'size',
        in: 'query',
        description: 'Size of a page',
        required: false,
        schema: {
            type: 'integer',
            format: 'int32',
        },
    }) size: number | undefined, @param({
        name: 'sort',
        in: 'query',
        description: 'Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.',
        required: false,
        explode: true,
        schema: {
            type: 'array',
            items: {
                type: 'string',
            },
        },
    }) sort: string[] | undefined): Promise<ContractsParametersForOfferings[]> {
        throw new Error('Not implemented');
    }

    /**
     *
     *
     * @param page Page number of the requested page
     * @param size Size of a page
     * @param sort Sorting criteria in the format: property(,asc|desc). Default
     sort order is ascending. Multiple sort criteria are supported.
     * @returns OK
     */
    @operation('get', '/api/registration/offerings-list', {
        tags: [
            'registration-offering',
        ],
        summary: 'get a list of offerings',
        operationId: 'getOfferingsListUsingGET',
        parameters: [
            {
                name: 'page',
                in: 'query',
                description: 'Page number of the requested page',
                required: false,
                schema: {
                    type: 'integer',
                    format: 'int32',
                },
            },
            {
                name: 'size',
                in: 'query',
                description: 'Size of a page',
                required: false,
                schema: {
                    type: 'integer',
                    format: 'int32',
                },
            },
            {
                name: 'sort',
                in: 'query',
                description: 'Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.',
                required: false,
                explode: true,
                schema: {
                    type: 'array',
                    items: {
                        type: 'string',
                    },
                },
            },
        ],
        responses: {
            '200': {
                description: 'OK',
                content: {
                    '*/*': {
                        schema: {
                            type: 'array',
                            items: {
                                $ref: '#/components/schemas/OfferingsList',
                            },
                        },
                    },
                },
            },
            '401': {
                description: 'Unauthorized',
            },
            '403': {
                description: 'Forbidden',
            },
            '404': {
                description: 'failed to get list of offerings',
            },
        },
        deprecated: false,
    })
    async getOfferingsListUsingGet(@param({
        name: 'page',
        in: 'query',
        description: 'Page number of the requested page',
        required: false,
        schema: {
            type: 'integer',
            format: 'int32',
        },
    }) page: number | undefined, @param({
        name: 'size',
        in: 'query',
        description: 'Size of a page',
        required: false,
        schema: {
            type: 'integer',
            format: 'int32',
        },
    }) size: number | undefined, @param({
        name: 'sort',
        in: 'query',
        description: 'Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.',
        required: false,
        explode: true,
        schema: {
            type: 'array',
            items: {
                type: 'string',
            },
        },
    }) sort: string[] | undefined): Promise<OfferingsList[]> {
        throw new Error('Not implemented');
    }

    /**
     *
     *
     * @param page Page number of the requested page
     * @param size Size of a page
     * @param sort Sorting criteria in the format: property(,asc|desc). Default
     sort order is ascending. Multiple sort criteria are supported.
     * @returns OK
     */
    @operation('get', '/api/registration/providers-list', {
        tags: [
            'registration-offering',
        ],
        summary: 'get a list of providers',
        operationId: 'getProvidersListUsingGET',
        parameters: [
            {
                name: 'page',
                in: 'query',
                description: 'Page number of the requested page',
                required: false,
                schema: {
                    type: 'integer',
                    format: 'int32',
                },
            },
            {
                name: 'size',
                in: 'query',
                description: 'Size of a page',
                required: false,
                schema: {
                    type: 'integer',
                    format: 'int32',
                },
            },
            {
                name: 'sort',
                in: 'query',
                description: 'Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.',
                required: false,
                explode: true,
                schema: {
                    type: 'array',
                    items: {
                        type: 'string',
                    },
                },
            },
        ],
        responses: {
            '200': {
                description: 'OK',
                content: {
                    '*/*': {
                        schema: {
                            type: 'array',
                            items: {
                                $ref: '#/components/schemas/ProvidersList',
                            },
                        },
                    },
                },
            },
            '401': {
                description: 'Unauthorized',
            },
            '403': {
                description: 'Forbidden',
            },
            '404': {
                description: 'failed to get list of providers',
            },
        },
        deprecated: false,
    })
    async getProvidersListUsingGet(@param({
        name: 'page',
        in: 'query',
        description: 'Page number of the requested page',
        required: false,
        schema: {
            type: 'integer',
            format: 'int32',
        },
    }) page: number | undefined, @param({
        name: 'size',
        in: 'query',
        description: 'Size of a page',
        required: false,
        schema: {
            type: 'integer',
            format: 'int32',
        },
    }) size: number | undefined, @param({
        name: 'sort',
        in: 'query',
        description: 'Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.',
        required: false,
        explode: true,
        schema: {
            type: 'array',
            items: {
                type: 'string',
            },
        },
    }) sort: string[] | undefined): Promise<ProvidersList[]> {
        throw new Error('Not implemented');
    }

    /**
     *
     *
     * @param category category
     * @param page Page number of the requested page
     * @param size Size of a page
     * @param sort Sorting criteria in the format: property(,asc|desc). Default
     sort order is ascending. Multiple sort criteria are supported.
     * @returns OK
     */
    @operation('get', '/api/registration/providers/{category}/category', {
        tags: [
            'registration-offering',
        ],
        summary: 'get a list of providers by category',
        operationId: 'getProvidersListByCategoryGET',
        parameters: [
            {
                name: 'category',
                in: 'path',
                description: 'category',
                required: true,
                schema: {
                    type: 'string',
                },
            },
            {
                name: 'page',
                in: 'query',
                description: 'Page number of the requested page',
                required: false,
                schema: {
                    type: 'integer',
                    format: 'int32',
                },
            },
            {
                name: 'size',
                in: 'query',
                description: 'Size of a page',
                required: false,
                schema: {
                    type: 'integer',
                    format: 'int32',
                },
            },
            {
                name: 'sort',
                in: 'query',
                description: 'Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.',
                required: false,
                explode: true,
                schema: {
                    type: 'array',
                    items: {
                        type: 'string',
                    },
                },
            },
        ],
        responses: {
            '200': {
                description: 'OK',
                content: {
                    '*/*': {
                        schema: {
                            type: 'array',
                            items: {
                                $ref: '#/components/schemas/ProvidersList',
                            },
                        },
                    },
                },
            },
            '401': {
                description: 'Unauthorized',
            },
            '403': {
                description: 'Forbidden',
            },
            '404': {
                description: 'failed to get list of providers',
            },
        },
        deprecated: false,
    })
    async getProvidersListByCategoryGet(@param({
        name: 'category',
        in: 'path',
        description: 'category',
        required: true,
        schema: {
            type: 'string',
        },
    }) category: string, @param({
        name: 'page',
        in: 'query',
        description: 'Page number of the requested page',
        required: false,
        schema: {
            type: 'integer',
            format: 'int32',
        },
    }) page: number | undefined, @param({
        name: 'size',
        in: 'query',
        description: 'Size of a page',
        required: false,
        schema: {
            type: 'integer',
            format: 'int32',
        },
    }) size: number | undefined, @param({
        name: 'sort',
        in: 'query',
        description: 'Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.',
        required: false,
        explode: true,
        schema: {
            type: 'array',
            items: {
                type: 'string',
            },
        },
    }) sort: string[] | undefined): Promise<ProvidersList[]> {
        throw new Error('Not implemented');
    }

    /**
     *
     *
     * @param _requestBody dataOfferingDto
     */
    @operation('patch', '/api/registration/update-offering', {
        tags: [
            'registration-offering',
        ],
        summary: 'update already registered offering info',
        operationId: 'updateOfferingUsingPATCH',
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/DataOfferingDto',
                    },
                },
            },
            description: 'dataOfferingDto',
            required: true,
        },
        responses: {
            '200': {
                description: 'OK',
            },
            '204': {
                description: 'No Content',
            },
            '400': {
                description: 'failed to update offerings',
            },
            '401': {
                description: 'Unauthorized',
            },
            '403': {
                description: 'Forbidden',
            },
        },
        deprecated: false,
    })
    async updateOfferingUsingPatch(@requestBody({
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/DataOfferingDto',
                },
            },
        },
        description: 'dataOfferingDto',
        required: true,
    }) _requestBody: DataOfferingDto): Promise<unknown> {
        throw new Error('Not implemented');
    }

}

