import { PartialType } from '@nestjs/mapped-types';
import { CreateAddressDto } from './create-address.dto';

export class UpdateAddressDto extends PartialType(CreateAddressDto) {
    // street?: string;
    // number?: string;
    // district?: string;
    // complement?: string;
    // city?: string;
    // country?: string;
    // state?: string;
    // zipcode?: string;
}
