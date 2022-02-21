import {api, operation, param, requestBody} from '@loopback/rest';
import {LoopbackCount} from '../../models';
import {Registry} from '../../models';
import {RegistryPartial} from '../../models';
import {RegistryFilter} from '../../models';
import {RegistryWithRelations} from '../../models';
import {NewRegistry} from '../../models';
import {RegistryFilter1} from '../../models1.model';

/**
 * The controller class is generated from OpenAPI spec with operations tagged
 * by RegistryController.
 *
 */
@api({
    components: {
        schemas: {
            Registry: {
                title: 'Registry',
                type: 'object',
                properties: {
                    id: {
                        type: 'number',
                    },
                    dateOfReception: {
                        type: 'number',
                    },
                    dataHash: {
                        type: 'string',
                    },
                    merkleRoot: {
                        type: 'string',
                    },
                    merkleProof: {
                        type: 'array',
                        items: {},
                    },
                    readyForRegistration: {
                        type: 'boolean',
                    },
                },
                additionalProperties: false,
            },
            NewRegistry: {
                title: 'NewRegistry',
                type: 'object',
                description: "(tsType: Omit<Registry, 'id' | 'dateOfReception' | 'merkleRoot' | 'merkleProof' | 'readyForRegistration'>, schemaOptions: { title: 'NewRegistry', exclude: [ 'id', 'dateOfReception', 'merkleRoot', 'merkleProof', 'readyForRegistration' ] })",
                properties: {
                    dataHash: {
                        type: 'string',
                    },
                },
                additionalProperties: false,
                'x-typescript-type': "Omit<Registry, 'id' | 'dateOfReception' | 'merkleRoot' | 'merkleProof' | 'readyForRegistration'>",
            },
            RegistryWithRelations: {
                title: 'RegistryWithRelations',
                type: 'object',
                description: '(tsType: RegistryWithRelations, schemaOptions: { includeRelations: true })',
                properties: {
                    id: {
                        type: 'number',
                    },
                    dateOfReception: {
                        type: 'number',
                    },
                    dataHash: {
                        type: 'string',
                    },
                    merkleRoot: {
                        type: 'string',
                    },
                    merkleProof: {
                        type: 'array',
                        items: {},
                    },
                    readyForRegistration: {
                        type: 'boolean',
                    },
                },
                additionalProperties: false,
                'x-typescript-type': 'RegistryWithRelations',
            },
            RegistryPartial: {
                title: 'RegistryPartial',
                type: 'object',
                description: '(tsType: Partial<Registry>, schemaOptions: { partial: true })',
                properties: {
                    id: {
                        type: 'number',
                    },
                    dateOfReception: {
                        type: 'number',
                    },
                    dataHash: {
                        type: 'string',
                    },
                    merkleRoot: {
                        type: 'string',
                    },
                    merkleProof: {
                        type: 'array',
                        items: {},
                    },
                    readyForRegistration: {
                        type: 'boolean',
                    },
                },
                additionalProperties: false,
                'x-typescript-type': 'Partial<Registry>',
            },
            'loopback.Count': {
                type: 'object',
                title: 'loopback.Count',
                'x-typescript-type': '@loopback/repository#Count',
                properties: {
                    count: {
                        type: 'number',
                    },
                },
            },
            'Registry.Filter': {
                type: 'object',
                title: 'Registry.Filter',
                properties: {
                    offset: {
                        type: 'integer',
                        minimum: 0,
                    },
                    limit: {
                        type: 'integer',
                        minimum: 1,
                        example: 100,
                    },
                    skip: {
                        type: 'integer',
                        minimum: 0,
                    },
                    order: {
                        oneOf: [
                            {
                                type: 'string',
                            },
                            {
                                type: 'array',
                                items: {
                                    type: 'string',
                                },
                            },
                        ],
                    },
                    fields: {
                        oneOf: [
                            {
                                type: 'object',
                                properties: {
                                    id: {
                                        type: 'boolean',
                                    },
                                    dateOfReception: {
                                        type: 'boolean',
                                    },
                                    dataHash: {
                                        type: 'boolean',
                                    },
                                    merkleRoot: {
                                        type: 'boolean',
                                    },
                                    merkleProof: {
                                        type: 'boolean',
                                    },
                                    readyForRegistration: {
                                        type: 'boolean',
                                    },
                                },
                                additionalProperties: false,
                            },
                            {
                                type: 'array',
                                items: {
                                    type: 'string',
                                    enum: [
                                        'id',
                                        'dateOfReception',
                                        'dataHash',
                                        'merkleRoot',
                                        'merkleProof',
                                        'readyForRegistration',
                                    ],
                                    example: 'id',
                                },
                                uniqueItems: true,
                            },
                        ],
                        title: 'Registry.Fields',
                    },
                },
                additionalProperties: false,
                'x-typescript-type': '@loopback/repository#Filter<Registry>',
            },
            'Registry.Filter1': {
                type: 'object',
                title: 'Registry.Filter',
                properties: {
                    offset: {
                        type: 'integer',
                        minimum: 0,
                    },
                    limit: {
                        type: 'integer',
                        minimum: 1,
                        example: 100,
                    },
                    skip: {
                        type: 'integer',
                        minimum: 0,
                    },
                    order: {
                        oneOf: [
                            {
                                type: 'string',
                            },
                            {
                                type: 'array',
                                items: {
                                    type: 'string',
                                },
                            },
                        ],
                    },
                    where: {
                        title: 'Registry.WhereFilter',
                        type: 'object',
                        additionalProperties: true,
                    },
                    fields: {
                        oneOf: [
                            {
                                type: 'object',
                                properties: {
                                    id: {
                                        type: 'boolean',
                                    },
                                    dateOfReception: {
                                        type: 'boolean',
                                    },
                                    dataHash: {
                                        type: 'boolean',
                                    },
                                    merkleRoot: {
                                        type: 'boolean',
                                    },
                                    merkleProof: {
                                        type: 'boolean',
                                    },
                                    readyForRegistration: {
                                        type: 'boolean',
                                    },
                                },
                                additionalProperties: false,
                            },
                            {
                                type: 'array',
                                items: {
                                    type: 'string',
                                    enum: [
                                        'id',
                                        'dateOfReception',
                                        'dataHash',
                                        'merkleRoot',
                                        'merkleProof',
                                        'readyForRegistration',
                                    ],
                                    example: 'id',
                                },
                                uniqueItems: true,
                            },
                        ],
                        title: 'Registry.Fields',
                    },
                },
                additionalProperties: false,
                'x-typescript-type': '@loopback/repository#Filter<Registry>',
            },
        },
    },
    paths: {},
})
export class RegistryController {
    constructor() {}

    /**
     *
     *
     * @param where
     * @returns Registry model count
     */
    @operation('get', '/registries/count', {
        'x-controller-name': 'RegistryController',
        'x-operation-name': 'count',
        tags: [
            'RegistryController',
        ],
        responses: {
            '200': {
                description: 'Registry model count',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/loopback.Count',
                        },
                    },
                },
            },
        },
        parameters: [
            {
                name: 'where',
                in: 'query',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            title: 'Registry.WhereFilter',
                            additionalProperties: true,
                            'x-typescript-type': '@loopback/repository#Where<Registry>',
                        },
                    },
                },
            },
        ],
        operationId: 'RegistryController.count',
    })
    async count(@param({
        name: 'where',
        in: 'query',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    title: 'Registry.WhereFilter',
                    additionalProperties: true,
                    'x-typescript-type': '@loopback/repository#Where<Registry>',
                },
            },
        },
    }) where: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [additionalProperty: string]: any;
    } | undefined): Promise<LoopbackCount> {
        throw new Error('Not implemented');
    }

    /**
     *
     *
     * @param id
     * @param _requestBody
     */
    @operation('put', '/registries/{id}', {
        'x-controller-name': 'RegistryController',
        'x-operation-name': 'replaceById',
        tags: [
            'RegistryController',
        ],
        responses: {
            '204': {
                description: 'No Content',
                content: {
                    'application/json': {
                        schema: {
                            description: 'Registry PUT success',
                        },
                    },
                },
            },
        },
        parameters: [
            {
                name: 'id',
                in: 'path',
                schema: {
                    type: 'number',
                },
                required: true,
            },
        ],
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/Registry',
                    },
                },
            },
            'x-parameter-index': 1,
        },
        operationId: 'RegistryController.replaceById',
    })
    async replaceById(@param({
        name: 'id',
        in: 'path',
        schema: {
            type: 'number',
        },
        required: true,
    }) id: number, @requestBody({
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/Registry',
                },
            },
        },
        'x-parameter-index': 1,
    }) _requestBody: Registry): Promise<unknown> {
        throw new Error('Not implemented');
    }

    /**
     *
     *
     * @param id
     * @param _requestBody
     */
    @operation('patch', '/registries/{id}', {
        'x-controller-name': 'RegistryController',
        'x-operation-name': 'updateById',
        tags: [
            'RegistryController',
        ],
        responses: {
            '204': {
                description: 'No Content',
                content: {
                    'application/json': {
                        schema: {
                            description: 'Registry PATCH success',
                        },
                    },
                },
            },
        },
        parameters: [
            {
                name: 'id',
                in: 'path',
                schema: {
                    type: 'number',
                },
                required: true,
            },
        ],
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/RegistryPartial',
                    },
                },
            },
            'x-parameter-index': 1,
        },
        operationId: 'RegistryController.updateById',
    })
    async updateById(@param({
        name: 'id',
        in: 'path',
        schema: {
            type: 'number',
        },
        required: true,
    }) id: number, @requestBody({
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/RegistryPartial',
                },
            },
        },
        'x-parameter-index': 1,
    }) _requestBody: RegistryPartial): Promise<unknown> {
        throw new Error('Not implemented');
    }

    /**
     *
     *
     * @param id
     * @param filter
     * @returns Registry model instance
     */
    @operation('get', '/registries/{id}', {
        'x-controller-name': 'RegistryController',
        'x-operation-name': 'findById',
        tags: [
            'RegistryController',
        ],
        responses: {
            '200': {
                description: 'Registry model instance',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/RegistryWithRelations',
                        },
                    },
                },
            },
        },
        parameters: [
            {
                name: 'id',
                in: 'path',
                schema: {
                    type: 'number',
                },
                required: true,
            },
            {
                name: 'filter',
                in: 'query',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Registry.Filter',
                        },
                    },
                },
            },
        ],
        operationId: 'RegistryController.findById',
    })
    async findById(@param({
        name: 'id',
        in: 'path',
        schema: {
            type: 'number',
        },
        required: true,
    }) id: number, @param({
        name: 'filter',
        in: 'query',
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/Registry.Filter',
                },
            },
        },
    }) filter: RegistryFilter | undefined): Promise<RegistryWithRelations> {
        throw new Error('Not implemented');
    }

    /**
     *
     *
     * @param id
     */
    @operation('delete', '/registries/{id}', {
        'x-controller-name': 'RegistryController',
        'x-operation-name': 'deleteById',
        tags: [
            'RegistryController',
        ],
        responses: {
            '204': {
                description: 'No Content',
                content: {
                    'application/json': {
                        schema: {
                            description: 'Registry DELETE success',
                        },
                    },
                },
            },
        },
        parameters: [
            {
                name: 'id',
                in: 'path',
                schema: {
                    type: 'number',
                },
                required: true,
            },
        ],
        operationId: 'RegistryController.deleteById',
    })
    async deleteById(@param({
        name: 'id',
        in: 'path',
        schema: {
            type: 'number',
        },
        required: true,
    }) id: number): Promise<unknown> {
        throw new Error('Not implemented');
    }

    /**
     *
     *
     * @param _requestBody
     * @returns Registry model instance
     */
    @operation('post', '/registries', {
        'x-controller-name': 'RegistryController',
        'x-operation-name': 'create',
        tags: [
            'RegistryController',
        ],
        responses: {
            '200': {
                description: 'Registry model instance',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Registry',
                        },
                    },
                },
            },
        },
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/NewRegistry',
                    },
                },
            },
        },
        operationId: 'RegistryController.create',
    })
    async create(@requestBody({
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/NewRegistry',
                },
            },
        },
    }) _requestBody: NewRegistry): Promise<Registry> {
        throw new Error('Not implemented');
    }

    /**
     *
     *
     * @param where
     * @param _requestBody
     * @returns Registry PATCH success count
     */
    @operation('patch', '/registries', {
        'x-controller-name': 'RegistryController',
        'x-operation-name': 'updateAll',
        tags: [
            'RegistryController',
        ],
        responses: {
            '200': {
                description: 'Registry PATCH success count',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/loopback.Count',
                        },
                    },
                },
            },
        },
        parameters: [
            {
                name: 'where',
                in: 'query',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            title: 'Registry.WhereFilter',
                            additionalProperties: true,
                            'x-typescript-type': '@loopback/repository#Where<Registry>',
                        },
                    },
                },
            },
        ],
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/RegistryPartial',
                    },
                },
            },
        },
        operationId: 'RegistryController.updateAll',
    })
    async updateAll(@param({
        name: 'where',
        in: 'query',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    title: 'Registry.WhereFilter',
                    additionalProperties: true,
                    'x-typescript-type': '@loopback/repository#Where<Registry>',
                },
            },
        },
    }) where: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [additionalProperty: string]: any;
    } | undefined, @requestBody({
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/RegistryPartial',
                },
            },
        },
    }) _requestBody: RegistryPartial): Promise<LoopbackCount> {
        throw new Error('Not implemented');
    }

    /**
     *
     *
     * @param filter
     * @returns Array of Registry model instances
     */
    @operation('get', '/registries', {
        'x-controller-name': 'RegistryController',
        'x-operation-name': 'find',
        tags: [
            'RegistryController',
        ],
        responses: {
            '200': {
                description: 'Array of Registry model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: {
                                $ref: '#/components/schemas/RegistryWithRelations',
                            },
                        },
                    },
                },
            },
        },
        parameters: [
            {
                name: 'filter',
                in: 'query',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Registry.Filter1',
                        },
                    },
                },
            },
        ],
        operationId: 'RegistryController.find',
    })
    async find(@param({
        name: 'filter',
        in: 'query',
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/Registry.Filter1',
                },
            },
        },
    }) filter: RegistryFilter1 | undefined): Promise<RegistryWithRelations[]> {
        throw new Error('Not implemented');
    }

}

