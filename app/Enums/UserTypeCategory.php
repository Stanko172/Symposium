<?php

declare(strict_types=1);

namespace App\Enums;

enum UserTypeCategory: string
{
    case AcademicStaff = 'academic_staff';
    case Student = 'student';
    case Business = 'business';
}
