<?php

declare(strict_types=1);

namespace App\ViewModels;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Support\Str;
use Reflection;
use ReflectionClass;
use ReflectionMethod;

abstract class ViewModel implements Arrayable
{
    final public function toArray(): array
    {
        return collect((new ReflectionClass($this))->getMethods())
            ->reject(fn (ReflectionMethod $method): bool => in_array($method->getName(), ['__construct', '__invoke', 'toArray'])
            )
            ->filter(fn (ReflectionMethod $method): bool => in_array('public', Reflection::getModifierNames($method->getModifiers()))
            )
            ->mapWithKeys(fn (ReflectionMethod $method) => [
                Str::camel($method->getName()) => $this->{$method->getName()}(),
            ])
            ->toArray();
    }
}
