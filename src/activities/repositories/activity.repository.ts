import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Activity, ActivityDocument } from '../schemas/activity.schema';

@Injectable()
export class ActivityRepository {
  constructor(
    @InjectModel(Activity.name) private readonly activityModel: Model<ActivityDocument>,
  ) {}

  async createActivity(userId: number, description: string): Promise<Activity> {
    const newActivity = new this.activityModel({ userId, description });
    return newActivity.save();
  }
}
