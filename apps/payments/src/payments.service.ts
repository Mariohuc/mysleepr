import { NOTIFICATIONS_SERVICE } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import Stripe from 'stripe';
import { PaymentsCreateChargeDto } from './dto/payments-create-charge.dto';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY'),
    {
      apiVersion: '2023-10-16',
    },
  );
  constructor(
    private readonly configService: ConfigService,
    @Inject(NOTIFICATIONS_SERVICE)
    private readonly notificationsService: ClientProxy,
  ) {}

  async createCharge({ amount, email }: PaymentsCreateChargeDto) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: amount * 100, // because strapi proccess the amount in cent unit
      confirm: true, // when this's true it'll inmediately confirm the payment intent so that we charge the user right
      currency: 'usd',
      payment_method: 'pm_card_visa',
      /* This last needed option was sourced by Jean Paul https://www.udemy.com/user/jeanpauldejong/ */
      automatic_payment_methods: {
        allow_redirects: 'never',
        enabled: true,
      },
    });

    /**
     * When working with events, use emit instead of send method
     */
    this.notificationsService.emit('notify_email', {
      email,
      text: `Your payment of $${amount} has completed successfully`,
    });

    return paymentIntent;
  }
}
