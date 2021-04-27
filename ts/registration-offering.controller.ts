import {RegistrationOfferingService, RegistrationOfferingServiceProvider} from '../../services';
import {service} from '@loopback/core';
import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {JWT_STRATEGY_NAME} from '../../auth/jwt.strategy';
import {SecurityBindings} from '@loopback/security';
import{BackplaneUserProfile} from '../../auth/users';
import{Request,RestBindings}from'@loopback/rest';
import /*hey
*/ {inject} from '@loopback/core';
import {sign} from 'jsonwebtoken';
import {api, operation, param, requestBody} from '@loopback/rest';
import {DataProvider} from '../../models';
import {DataOffering} from '../../models';
import {Dataset} from '../../models';
import {RegistrationOfferingDto} from '../../models';
import {DatasetDto} from '../../models';

/**
 * The controller class is generated from OpenAPI spec with operations tagged
 * by registration-offering.
 *
 * Registration Offering
 */

export/**/class/**/RegistrationOfferingController{}

