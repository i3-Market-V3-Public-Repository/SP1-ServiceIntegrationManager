
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
        summary: 'get a registered data offering by provider',
        operationId: 'getRegisteredOfferingsUsingGET',
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
                                $ref: '#/components/schemas/RegistrationOfferingDTO',
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
                description: 'Not Found',
            },
        },
        deprecated: false,
    })
    async getRegisteredOfferingsUsingGet(@param({
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
    }) sort: string[] | undefined): Promise<RegistrationOfferingDto> {
        throw new Error('Not implemented');
    }
]